using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CornerShopApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Stock = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Category", "Description", "ImageUrl", "Name", "Price", "Stock" },
                values: new object[,]
                {
                    { 1, "Electronics", "Ergonomic wireless mouse", "https://picsum.photos/seed/mouse/400/300", "Wireless Mouse", 19.99m, 50 },
                    { 2, "Electronics", "Blue switches mechanical keyboard", "https://picsum.photos/seed/keyboard/400/300", "Mechanical Keyboard", 59.99m, 30 },
                    { 3, "Electronics", "Fast charging 65W USB-C", "https://picsum.photos/seed/charger/400/300", "USB-C Charger", 24.99m, 80 },
                    { 4, "Fashion", "Lightweight running shoes", "https://picsum.photos/seed/shoes/400/300", "Running Shoes", 49.99m, 25 },
                    { 5, "Sports", "Insulated steel bottle 1L", "https://picsum.photos/seed/bottle/400/300", "Water Bottle", 14.99m, 100 },
                    { 6, "Fashion", "Laptop backpack 15 inch", "https://picsum.photos/seed/bag/400/300", "Backpack", 39.99m, 40 },
                    { 7, "Electronics", "Portable speaker with bass", "https://picsum.photos/seed/speaker/400/300", "Bluetooth Speaker", 29.99m, 35 },
                    { 8, "Electronics", "Fitness tracking smartwatch", "https://picsum.photos/seed/watch/400/300", "Smartwatch", 79.99m, 20 },
                    { 9, "Home", "Ceramic mug 350ml", "https://picsum.photos/seed/mug/400/300", "Coffee Mug", 9.99m, 120 },
                    { 10, "Home", "LED desk lamp with dimmer", "https://picsum.photos/seed/lamp/400/300", "Desk Lamp", 22.99m, 45 },
                    { 11, "Stationery", "Hardcover notebook A5", "https://picsum.photos/seed/notebook/400/300", "Notebook", 6.99m, 200 },
                    { 12, "Stationery", "Smooth gel pen set (10)", "https://picsum.photos/seed/pens/400/300", "Pen Set", 8.99m, 150 },
                    { 13, "Sports", "Non-slip yoga mat", "https://picsum.photos/seed/yoga/400/300", "Yoga Mat", 18.99m, 60 },
                    { 14, "Sports", "Pair of 5kg dumbbells", "https://picsum.photos/seed/dumbbell/400/300", "Dumbbells", 34.99m, 18 },
                    { 15, "Electronics", "Over-ear noise isolation", "https://picsum.photos/seed/headphones/400/300", "Headphones", 44.99m, 28 },
                    { 16, "Fashion", "Cotton t-shirt regular fit", "https://picsum.photos/seed/tshirt/400/300", "T-shirt", 12.99m, 90 },
                    { 17, "Fashion", "Slim fit stretch jeans", "https://picsum.photos/seed/jeans/400/300", "Jeans", 39.99m, 55 },
                    { 18, "Home", "Non-stick frying pan 28cm", "https://picsum.photos/seed/pan/400/300", "Cooking Pan", 27.99m, 32 },
                    { 19, "Home", "Queen size bedsheet set", "https://picsum.photos/seed/bedsheet/400/300", "Bedsheet Set", 24.99m, 26 },
                    { 20, "Personal Care", "SPF 50 PA+++ sunscreen", "https://picsum.photos/seed/sunscreen/400/300", "Sunscreen", 11.49m, 70 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
