namespace Dtos.Cart;
public record CartItemDto(
    int ProductId,
    string Name,
    decimal Price,
    string ImageUrl,
    int Quantity
);