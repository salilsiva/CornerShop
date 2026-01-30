using System.Security.Claims;
using CornerShopApi.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CornerShopApi.Data.Dtos.Cart;
using Microsoft.IdentityModel.Tokens;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CartController : ControllerBase
{   
    private readonly CSDbContext _db;
    private readonly ILogger<CartController> _logger;
    public CartController(CSDbContext db, ILogger<CartController> logger)
    {
        _db = db;
        _logger = logger;
    }

    private string GetUserId() =>
        User.FindFirstValue(ClaimTypes.NameIdentifier)?? throw new Exception("UserId missing");

    [HttpGet]
    public async Task<ActionResult<List<CartItemDto>>> GetMyCart()
    {
        _logger.LogInformation("GetMyCart called...");
        var userId = GetUserId();

        var items = await _db.CartItems
            .AsNoTracking()
            .Include(x => x.Product)
            .Where(x => x.UserId == userId)
            .Select(x => new CartItemDto(
                x.ProductId,
                x.Product!.Name,
                x.Product!.Price,
                x.Product!.ImageUrl,
                x.Quantity
            )).ToListAsync();

        return Ok(items);
    }

    [HttpPost("items")]
    public async Task<ActionResult> AddItem(AddCartItemRequest req)
    { 
        _logger.LogInformation("CartController.AddItem called..." + req);
        var userId = GetUserId();

        var existing = await _db.CartItems
            .FirstOrDefaultAsync(x => x.UserId == userId && x.ProductId == req.ProductId);

        if(existing is null)
        {
            _db.CartItems.Add(new CartItem
            {
                UserId = userId,
                ProductId = req.ProductId,
                Quantity = req.Quantity
            });
        }
        else
        {
            existing.Quantity += req.Quantity;
        }

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPut("items/{productId:int}")]
    public async Task<IActionResult> UpdateQuantity(int productId, [FromQuery] int qty)
    {
        var userId = GetUserId();

        var item = await _db.CartItems.FirstOrDefaultAsync(x=> x.UserId == userId && x.ProductId == productId);
        if(item is null) return NotFound();

        if(qty <= 0)
        {
            _db.CartItems.Remove(item);
        }
        else
        {
            item.Quantity = qty;
        }

        await _db.SaveChangesAsync();
        return NoContent();



    }

    [HttpDelete("items/{ProductId:int}")]
    public async Task<IActionResult> RemoveItem(int ProductId)
    {
        var userId = GetUserId();
        var item = await _db.CartItems.FirstOrDefaultAsync(x=> x.UserId == userId && x.ProductId == ProductId);

        if(item is null) return NotFound();

        _db.CartItems.Remove(item);
        await _db.SaveChangesAsync();
        return NoContent();

    }

}