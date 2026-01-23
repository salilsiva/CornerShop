# STATUS

## Day 1
- [x] Repo structure created
- [x] SQL Server Docker running
- [x] .NET API scaffold running with Swagger

## Day 2
- [x] EF Core connected to SQL Server
- [x] Products table created via migrations
- [x] Seeded 20 products
- [x] Products API endpoints working (GET all, GET by id)

## Current branch
main

## How to run
- SQL: docker compose -f infra/docker-compose.yml up -d
- API: cd services/CornerShopApi && dotnet run