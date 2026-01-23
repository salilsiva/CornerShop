public class ProductSeed
{
    public static List<Product> GetProducts() => new()
    {
        new Product { Id=1, Name="Wireless Mouse", Description="Ergonomic wireless mouse", Price=19.99m, Category="Electronics", Stock=50, ImageUrl="https://picsum.photos/seed/mouse/400/300" },
        new Product { Id=2, Name="Mechanical Keyboard", Description="Blue switches mechanical keyboard", Price=59.99m, Category="Electronics", Stock=30, ImageUrl="https://picsum.photos/seed/keyboard/400/300" },
        new Product { Id=3, Name="USB-C Charger", Description="Fast charging 65W USB-C", Price=24.99m, Category="Electronics", Stock=80, ImageUrl="https://picsum.photos/seed/charger/400/300" },
        new Product { Id=4, Name="Running Shoes", Description="Lightweight running shoes", Price=49.99m, Category="Fashion", Stock=25, ImageUrl="https://picsum.photos/seed/shoes/400/300" },
        new Product { Id=5, Name="Water Bottle", Description="Insulated steel bottle 1L", Price=14.99m, Category="Sports", Stock=100, ImageUrl="https://picsum.photos/seed/bottle/400/300" },
        new Product { Id=6, Name="Backpack", Description="Laptop backpack 15 inch", Price=39.99m, Category="Fashion", Stock=40, ImageUrl="https://picsum.photos/seed/bag/400/300" },
        new Product { Id=7, Name="Bluetooth Speaker", Description="Portable speaker with bass", Price=29.99m, Category="Electronics", Stock=35, ImageUrl="https://picsum.photos/seed/speaker/400/300" },
        new Product { Id=8, Name="Smartwatch", Description="Fitness tracking smartwatch", Price=79.99m, Category="Electronics", Stock=20, ImageUrl="https://picsum.photos/seed/watch/400/300" },
        new Product { Id=9, Name="Coffee Mug", Description="Ceramic mug 350ml", Price=9.99m, Category="Home", Stock=120, ImageUrl="https://picsum.photos/seed/mug/400/300" },
        new Product { Id=10, Name="Desk Lamp", Description="LED desk lamp with dimmer", Price=22.99m, Category="Home", Stock=45, ImageUrl="https://picsum.photos/seed/lamp/400/300" },

        new Product { Id=11, Name="Notebook", Description="Hardcover notebook A5", Price=6.99m, Category="Stationery", Stock=200, ImageUrl="https://picsum.photos/seed/notebook/400/300" },
        new Product { Id=12, Name="Pen Set", Description="Smooth gel pen set (10)", Price=8.99m, Category="Stationery", Stock=150, ImageUrl="https://picsum.photos/seed/pens/400/300" },
        new Product { Id=13, Name="Yoga Mat", Description="Non-slip yoga mat", Price=18.99m, Category="Sports", Stock=60, ImageUrl="https://picsum.photos/seed/yoga/400/300" },
        new Product { Id=14, Name="Dumbbells", Description="Pair of 5kg dumbbells", Price=34.99m, Category="Sports", Stock=18, ImageUrl="https://picsum.photos/seed/dumbbell/400/300" },
        new Product { Id=15, Name="Headphones", Description="Over-ear noise isolation", Price=44.99m, Category="Electronics", Stock=28, ImageUrl="https://picsum.photos/seed/headphones/400/300" },
        new Product { Id=16, Name="T-shirt", Description="Cotton t-shirt regular fit", Price=12.99m, Category="Fashion", Stock=90, ImageUrl="https://picsum.photos/seed/tshirt/400/300" },
        new Product { Id=17, Name="Jeans", Description="Slim fit stretch jeans", Price=39.99m, Category="Fashion", Stock=55, ImageUrl="https://picsum.photos/seed/jeans/400/300" },
        new Product { Id=18, Name="Cooking Pan", Description="Non-stick frying pan 28cm", Price=27.99m, Category="Home", Stock=32, ImageUrl="https://picsum.photos/seed/pan/400/300" },
        new Product { Id=19, Name="Bedsheet Set", Description="Queen size bedsheet set", Price=24.99m, Category="Home", Stock=26, ImageUrl="https://picsum.photos/seed/bedsheet/400/300" },
        new Product { Id=20, Name="Sunscreen", Description="SPF 50 PA+++ sunscreen", Price=11.49m, Category="Personal Care", Stock=70, ImageUrl="https://picsum.photos/seed/sunscreen/400/300" },
    };
    
}