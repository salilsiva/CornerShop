using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly CSDbContext _db;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(CSDbContext db, ILogger<ProductsController> logger)
    {
        this._db = db;
        this._logger = logger;
    }    

    //GET: /api/product
    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAll()
    {
        _logger.LogInformation("DB: {DbName}", _db.Database.GetDbConnection().Database);
        var products = await _db.Products.AsNoTracking().ToListAsync();
        _logger.LogInformation("Returned {count} products", products.Count);
        return Ok(products);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetById(int id)
    {
        _logger.LogInformation("DB: {DbName}", _db.Database.GetDbConnection().Database);
        var product = await _db.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id );
        
        if(product is null) return NotFound();
        return Ok(product);
    }
}
