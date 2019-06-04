using System;
using System.Linq;
using Pley.Models;

namespace Pley {
    public class DbInitializer
    {
        public static void Initialize(PleyContext context)
        {
            context.Database.EnsureCreated();

            if (!context.Users.Any())
            {
                var hmac = new System.Security.Cryptography.HMACSHA512();
                context.Users.Add(new User{ 
                    FirstName = "Olivier",
                    LastName = "Example",
                    Email = "admin@example.com",
                    CreatedOn = DateTime.Now,
                    ModifiedOn = DateTime.Now,
                    Type = UserType.ADMIN,
                    PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("password")),
                    PasswordSalt = hmac.Key
                  });
                hmac.Dispose();
                context.SaveChanges();
            }
        }
    }
}
