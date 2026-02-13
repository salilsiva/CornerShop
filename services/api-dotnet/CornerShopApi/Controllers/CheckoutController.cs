namespace CornerShopApi.Controllers;

using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe.Checkout;
using Dtos.Cart;
using CornerShopApi.Data;
using Stripe;

[ApiController]
[Route("payments")]
public class CheckoutController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly CSDbContext _db;

    public CheckoutController(IConfiguration config, CSDbContext db)
    {
        _db = db;
        _config = config;
    }

    public record CreateCheckoutRequest(int Quantity);

    [HttpGet("ping")]
    [AllowAnonymous]
    public IActionResult Ping() => Ok("pong");

    [HttpPost("checkout-session")]
    public async Task<ActionResult> CreateCheckoutSession([FromBody] CreateCheckoutSessionRequest req)
    {
        if(req?.Items == null || req.Items.Count == 0)
            return BadRequest("Cart is empty");

        var productIds = req.Items.Select(i => i.ProductId).Distinct().ToList();

        //Load products from DB
        var products = await _db.Products 
            .Where(p=> productIds.Contains(p.Id))
            .ToDictionaryAsync(p=> p.Id);
        
        //validate all requested products exist
        var missing = productIds.Where(id => !products.ContainsKey(id)).ToList();
        if(missing.Count > 0)
            return BadRequest($"Unknown ProductID(s): {string.Join(",", missing)}");

        const string currency = "gbp";
        var lineItems = new List<SessionLineItemOptions>();

        foreach(var item in req.Items)
        {
            if(item.Quantity <= 0) return BadRequest("Invalid quantity");

            var p =products[item.ProductId];

            var unitAmount = (long)Math.Round(p.Price * 100m, MidpointRounding.AwayFromZero);
            
            lineItems.Add(new SessionLineItemOptions
            {
                Quantity = item.Quantity,
                PriceData = new SessionLineItemPriceDataOptions
                {
                    Currency = currency,
                    UnitAmount = unitAmount,
                    ProductData = new SessionLineItemPriceDataProductDataOptions
                    {
                        Name = p.Name
                    }
                }
            });
        }

        //Your Angular site URL (where Stripe returns users)
        var frontEndBaseUrl = _config["Frontend:Baseurl"]?? "http://localhost:4200";

        var options = new SessionCreateOptions
        {
            Mode = "payment",
            LineItems = lineItems,

            // Where Stripe redirects after payment
            SuccessUrl = $"{frontEndBaseUrl}/payment-success?session_id={{CHECKOUT_SESSION_ID}}",
            CancelUrl = $"{frontEndBaseUrl}/cart",
        };

        var service = new SessionService();
        var session = await service.CreateAsync(options);

        return Ok(new {url = session.Url});
    }

    [HttpGet("checkout-session/{sessionId}")]
    public async Task<IActionResult> GetCheckoutSession([FromRoute] string sessionId)
    {
        var service = new SessionService();
        try
        {   
            var session = await service.GetAsync(sessionId);

            var status = session.PaymentStatus switch
            {
                "paid" => "paid",
                "unpaid" => "unpaid",
                _ => "pending"
            };

            return Ok(new
            {
                status,
                amountTotal = session.AmountTotal,
                currency = session.Currency,
                customerEmail = session.CustomerDetails?.Email,
                paymentIntentId = session.PaymentIntentId,
                receiptUrl = (string?)null
            });
        }
        catch (StripeException)
        {
            return Ok(new{status = "not_found"});
        }
    }


}