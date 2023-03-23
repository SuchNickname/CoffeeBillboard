using Microsoft.EntityFrameworkCore;

namespace CoffeeBillboard.Models
{
    public class Coffee
    {

        public string CoffeeName { get; set; } = "default";
        public double CoffeePrice { get; set; }
        public string? ImageFileName { get; set; } = "notfound";

    }
}
