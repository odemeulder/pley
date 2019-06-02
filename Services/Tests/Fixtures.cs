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
  public static class Fixtures
  {
    public static Restaurant restaurant1 = new Restaurant{
      Id = 1,
      RestaurantName = "The Dish",
      AverageRating = 4,
      Owner = owner1
    };
    public static Restaurant restaurant2 = new Restaurant{
      Id = 2,
      RestaurantName = "Al Dente",
      Owner = owner2
    };
    public static User reviewer1 = new User{
      Id = 1,
      FirstName = "a"
    };
    public static User reviewer2 = new User{
      Id = 2,
      FirstName = "b"
    };
    public static User owner1 = new User{
      Id = 3,
      FirstName = "c"
    };
    public static User owner2 = new User{
      Id = 4,
      FirstName = "d"
    };
    public static Review review1 = new Review{
      Id = 1,
      CustomerReview = "customer review 1",
      OwnerReply = "owner reply 1",
      Restaurant = restaurant1,
      Reviewer = reviewer1,
      VisitDate = new System.DateTime(2019, 5, 19),
      Rating = 5
    };
    public static Review review2 = new Review{
      Id = 2,
      CustomerReview = "customer review 2",
      OwnerReply = "owner reply 2",
      Restaurant = restaurant1,
      Reviewer = reviewer2,
      VisitDate = new System.DateTime(2019, 5, 18),
      Rating = 4
    };
    public static Review review3 = new Review{
      Id = 3,
      CustomerReview = "customer review 3",
      OwnerReply = "owner reply 3",
      Restaurant = restaurant2,
      Reviewer = reviewer1,
      VisitDate = new System.DateTime(2019, 5, 17),
      Rating = 3
    };
    public static Review newReview = new Review{
      Id = 10,
      CustomerReview = "customer review 4",
      OwnerReply = "owner reply 4",
      Restaurant = restaurant1,
      Reviewer = reviewer1,
      VisitDate = new System.DateTime(2019, 5, 17),
      Rating = 3
    };
    public static IList<Review> AllReviews => new List<Review>{review1, review2, review3};
  }
}