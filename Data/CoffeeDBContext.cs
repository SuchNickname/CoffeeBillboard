using CoffeeBillboard.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;


namespace CoffeeBillboard.Data
{
    public class CoffeeDBContext : DbContext
    {
        public CoffeeDBContext(DbContextOptions<CoffeeDBContext> options) : base(options) {
            Database.EnsureCreated();
        }

        

        public DbSet<Coffee> Coffee => Set<Coffee>();
    }
}
