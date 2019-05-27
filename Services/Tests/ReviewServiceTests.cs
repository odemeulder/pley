using Microsoft.Extensions.Logging;
using Moq;
using Pley.Models;
using Xunit;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System;

namespace Pley.Services.Tests
{
  public class GetReviewsShould : IDisposable
  {
    private PleyContext _ctx;
    private ReviewService _svc;
    public GetReviewsShould()
    {
      _ctx = PleyContextFactory.Create("Pley Review Get All");
      _svc = ReviewServiceFactory.Create(_ctx);
    }

    [Fact(Skip="In memory DB not working as expected")]
    public void ReturnReviews()
    {
      //Given
      _ctx.Reviews.Add(ReviewFixtures.review1);
      _ctx.Reviews.Add(ReviewFixtures.review2);
      _ctx.SaveChanges();
      //When
      var r = _svc.GetAll();
      //Then
      Assert.Equal(2, r.Count());
    }
    
    public void Dispose() {
      _ctx.Reviews.Remove(ReviewFixtures.review1);
      _ctx.Reviews.Remove(ReviewFixtures.review2);
      _ctx.Entry(ReviewFixtures.review1).State = EntityState.Detached;
      _ctx.Entry(ReviewFixtures.review2).State = EntityState.Detached;
      _ctx.SaveChanges();
      _ctx.Dispose();
    }
  }
  public class GetReviewByIdShould : IDisposable
  {
    private PleyContext _ctx;
    private ReviewService _svc;
    public GetReviewByIdShould()
    {
      _ctx = PleyContextFactory.Create("Pley Review By Id");
      _svc = ReviewServiceFactory.Create(_ctx);
    }

    [Fact(Skip="In memory DB not working as expected")]
    public void ReturnReview()
    {
      // Given
      _ctx.Reviews.Add(ReviewFixtures.review2);
      var r = _ctx.Reviews.Add(ReviewFixtures.review1);
      _ctx.SaveChanges();
      //When
      var res = _svc.Get(r.Entity.Id);
      //Then
      Assert.Equal(r.Entity.Id, res.Id);
      Assert.Equal(ReviewFixtures.review1.CustomerReview, res.CustomerReview);
      // Clean up
      _ctx.Reviews.Remove(ReviewFixtures.review1);
      _ctx.Reviews.Remove(ReviewFixtures.review2);
      _ctx.Entry(ReviewFixtures.review1).State = EntityState.Detached;
      _ctx.Entry(ReviewFixtures.review2).State = EntityState.Detached;
      _ctx.SaveChanges();
    }

    [Fact(Skip="In memory DB not working as expected")]
    public void ReturnNull()
    {
      //When
      Action action = () => _svc.Get(0);
      //Then
      Assert.Throws<PleyNotFoundException>(action);
    }

    public void Dispose() {
      _ctx.Dispose();
    }
  }

  public static class ReviewServiceFactory
  {
    public static ReviewService Create(PleyContext context) {
      var logger = new Mock<ILogger<ReviewService>>();
      var restaurantSvcMock = new Mock<IRestaurantService>();
      return new ReviewService(context, restaurantSvcMock.Object, logger.Object);
    }
  }

  public static class PleyContextFactory
  {
    public static PleyContext Create(string name)
    {
    // Create a fresh service provider, and therefore a fresh 
    // InMemory database instance.
    var serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .BuildServiceProvider();
      var options = new DbContextOptionsBuilder<PleyContext>()
                  .UseInMemoryDatabase(databaseName: name)
                  .UseInternalServiceProvider(serviceProvider)
                  .EnableSensitiveDataLogging()
                  .Options;
      return new PleyContext(options);
    }
  }

  public static class ReviewFixtures
  {
    public static Restaurant restaurant1 = new Restaurant{
      Id = 1,
      RestaurantName = "The Dish"
    };
    public static Restaurant restaurant2 = new Restaurant{
      Id = 2,
      RestaurantName = "Al Dente"
    };
    public static User reviewer1 = new User{
      Id = 1
    };
    public static User reviewer2 = new User{
      Id = 2
    };
    public static Review review1 = new Review{
      // Id = 1,
      CustomerReview = "customer review 1",
      OwnerReply = "owner reply 1",
      Restaurant = restaurant1,
      Reviewer = reviewer1,
      VisitDate = new System.DateTime(2019, 5, 19),
      Rating = 5
    };
    public static Review review2 = new Review{
//      Id = 2,
      CustomerReview = "customer review 2",
      OwnerReply = "owner reply 2",
      Restaurant = restaurant1,
      Reviewer = reviewer2,
      VisitDate = new System.DateTime(2019, 5, 18),
      Rating = 4
    };
    public static Review review3 = new Review{
//      Id = 3,
      CustomerReview = "customer review 3",
      OwnerReply = "owner reply 3",
      Restaurant = restaurant2,
      Reviewer = reviewer1,
      VisitDate = new System.DateTime(2019, 5, 17),
      Rating = 3
    };
    public static IList<Review> AllReviews => new List<Review>{review1, review2, review3};
  }
}