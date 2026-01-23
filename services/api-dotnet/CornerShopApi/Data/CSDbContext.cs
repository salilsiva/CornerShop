using Microsoft.EntityFrameworkCore;

public class CSDbContext : DbContext
{
    public CSDbContext(DbContextOptions<CSDbContext> options): base(options){}

    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Product>().HasData(ProductSeed.GetProducts());
    }
}