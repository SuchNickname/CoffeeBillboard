using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json.Serialization;
using CoffeeBillboard.Models;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel;
using Microsoft.Data.Sqlite;
using CoffeeBillboard.Data;

namespace CoffeeBillboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoffeeController : ControllerBase
    {
        //private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;
        public CoffeeController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;

        }

        // GET method to retrieve data from DB
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
SELECT _rowid_, coffeename, coffeeprice, imagefilename FROM Coffee
";
            DataTable table = new DataTable();
            //string sqlDataSource = _configuration.GetConnectionString("CoffeeSqlLiteDB");
            

            using(SqliteConnection conn = new SqliteConnection("Data Source=CoffeeBillboard.db")) {
                conn.Open();
                //using(SqliteCommand cmd = new SqliteCommand(query, conn))
                //{
                //    reader = cmd.ExecuteReader();
                //    table.Load(reader);
                //    reader.Close();
                //    conn.Close();
                    
                //}

                var command = conn.CreateCommand();
                command.CommandText = query;
                var reader = command.ExecuteReader();
                Console.WriteLine(reader.ToString());
                table.Load(reader);
                reader.Close();
                conn.Close();

            }
            
            return new JsonResult(table);

        }

        // POST method to retrieve data from API
        [HttpPost]
        public JsonResult Post(Coffee coffee)
        {
            string query = "INSERT INTO Coffee values (@CoffeeName, @CoffeePrice, @ImageFileName)";
            //string sqlDataSource = _configuration.GetConnectionString("CoffeeBillboardDB");

            using (SqliteConnection conn = new SqliteConnection("Data Source=CoffeeBillboard.db"))
            {
                conn.Open();
                using (SqliteCommand cmd = new SqliteCommand(query, conn))
                {
                    
                    cmd.Parameters.AddWithValue("@CoffeeName", coffee.CoffeeName);
                    cmd.Parameters.AddWithValue("@CoffeePrice", coffee.CoffeePrice);
                    cmd.Parameters.AddWithValue("@ImageFileName", coffee.ImageFileName);
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }

            }

                return new JsonResult("Successfully added");
        }

        // Testing GET method to retrieve particular item by ID
        [Route("{id?}")]
        [HttpGet]
        public JsonResult Get(int? id)
        {
            
            string query = @"
SELECT coffeename, coffeeprice, imagefilename FROM Coffee WHERE _rowid_=@id
";
            DataTable table = new DataTable();
            //string sqlDataSource = _configuration.GetConnectionString("CoffeeBillboardDB");
           

            using (SqliteConnection conn = new SqliteConnection("Data Source=CoffeeBillboard.db"))
            {
                conn.Open();
                using (SqliteCommand cmd = new SqliteCommand(query, conn))
                {
                    
                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    conn.Close();

                }
            }

            return new JsonResult(table);
        }

        // DELETE method to remove item form DB
        [Route("{id:int}")]
        [HttpDelete]
        public JsonResult Delete(int id)
        {
            string query = "DELETE FROM Coffee where _rowid_=@id";
            //string sqlDataSource = _configuration.GetConnectionString("CoffeeBillboardDB");

            using(SqliteConnection conn = new SqliteConnection("Data Source=CoffeeBillboard.db"))
            {
                conn.Open();
                using(SqliteCommand cmd = new SqliteCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();

                    conn.Close();
                }
            }

            return new JsonResult("Deleted successfully");
        }

        // Retrieve file from sent request and save it to /Photos dir
        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {

                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;
                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);

                }

                return new JsonResult(filename);

            }
            catch (Exception)
            {
                return new JsonResult("unavailable.png");
            }
        }


    }
}
