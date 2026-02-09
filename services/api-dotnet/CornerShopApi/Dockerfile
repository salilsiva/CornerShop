# Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY services/api-dotnet/CornerShopApi/CornerShopApi.csproj services/api-dotnet/CornerShopApi/
RUN dotnet restore services/api-dotnet/CornerShopApi/CornerShopApi.csproj

COPY . .
RUN dotnet publish services/api-dotnet/CornerShopApi/CornerShopApi.csproj -c Release -o /app/publish

# Run
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "CornerShopApi.dll"]