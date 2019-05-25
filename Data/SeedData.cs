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
                context.Users.Add(new User{ 
                    FirstName = "Olivier",
                    LastName = "De Meulder",
                    Email = "odemeulder@gmail.com",
                    CreatedOn = DateTime.Now,
                    ModifiedOn = DateTime.Now,
                    Type = UserType.ADMIN
                  });

                context.SaveChanges();
            }
        }
    }
}
