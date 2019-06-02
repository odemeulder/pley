using System;
using System.Linq;
using System.Collections.Generic;
using Pley;
using Pley.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Pley.Services.Tests
{
  public static class PleyContextFactory
  {
    public static PleyContext Create()
    {
    // Create a fresh service provider, and therefore a fresh 
    // InMemory database instance.
    var serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .BuildServiceProvider();
      var options = new DbContextOptionsBuilder<PleyContext>()
                  .UseInMemoryDatabase("Test Database")
                  .UseInternalServiceProvider(serviceProvider)
                  .EnableSensitiveDataLogging()
                  .Options;
      var context = new PleyContext(options);
      // Seeding the test context
      if (!context.Users.Any())
      {
        context.Users.Add(Fixtures.reviewer1);
        context.Users.Add(Fixtures.reviewer2);
        context.Users.Add(Fixtures.owner1);
        context.Users.Add(Fixtures.owner2);
      }
      if (!context.Restaurants.Any())
      {
        context.Restaurants.Add(Fixtures.restaurant1);
        context.Restaurants.Add(Fixtures.restaurant1);
      }
      if (!context.Reviews.Any())
      {
        context.Reviews.Add(Fixtures.review1);
        context.Reviews.Add(Fixtures.review2);
      }
      context.SaveChanges();
      return context;
    }
  }
}