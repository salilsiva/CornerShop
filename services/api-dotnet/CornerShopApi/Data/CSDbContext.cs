using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CornerShopApi.Models;
namespace CornerShopApi.Data;

public class CSDbContext : IdentityDbContext<ApplicationUser>
{
    public CSDbContext(DbContextOptions<CSDbContext> options): base(options){}

    public DbSet<Product> Products => Set<Product>();
    public DbSet<CartItem> CartItems => Set<CartItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Product>().HasData(ProductSeed.GetProducts());
        modelBuilder.Entity<CartItem>().HasIndex(x => new{x.UserId, x.ProductId})
        .IsUnique();
    }
}