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
  public abstract class ReviewServiceTest
  {
    protected PleyContext _ctx;
    protected ReviewService _svc;

    public ReviewServiceTest()
    {
      _ctx = PleyContextFactory.Create();
      _svc = ReviewServiceFactory.Create(_ctx);
    }
  }

  public class ReviewService_GetReviews_Should_ : ReviewServiceTest
  {
    [Fact]
    public void ReturnReviews()
    {
      //Given
      //When
      var r = _svc.GetAll();
      //Then
      Assert.Equal(2, r.Count());
    }
  }
  public class ReviewService_GetReviewById_Should_ : ReviewServiceTest
  {
    [Fact]
    public void ReturnReview()
    {
      //When
      var res = _svc.Get(1);
      //Then
      Assert.Equal(1, res.Id);
      Assert.Equal(Fixtures.review1.CustomerReview, res.CustomerReview);
    }

    [Fact]
    public void ThrowExpception()
    {
      //When
      Action action = () => _svc.Get(0);
      //Then
      Assert.Throws<PleyNotFoundException>(action);
    }
  }

  public class ReviewService_CreateReview_Should_ : ReviewServiceTest
  {
    [Fact]
    public void CreateReview()
    {
      //When
      var createdReview = _svc.Create(Fixtures.newReview);
      //Then
      Assert.Equal(Fixtures.newReview.CustomerReview, createdReview.CustomerReview);
      Assert.Equal(Fixtures.newReview.OwnerReply, createdReview.OwnerReply);
      Assert.Equal(Fixtures.newReview.VisitDate, createdReview.VisitDate);
      Assert.Equal(Fixtures.newReview.Rating, createdReview.Rating);
      Assert.Equal(Fixtures.newReview.Restaurant.Id, createdReview.Restaurant.Id);
      Assert.Equal(Fixtures.newReview.Reviewer.Id, createdReview.Reviewer.Id);
    }

    [Fact]
    public void UpdateAverageRating()
    {
      //Given
      var restaurant20 = new Restaurant{ Id = 20, AverageRating = 3};
      byte rating1 = 5;
      byte rating2 = 3;
      var review20 = new Review{ 
        Id = 20, 
        Restaurant = restaurant20, 
        Rating = rating1, 
        Reviewer = Fixtures.reviewer1};
      var review21 = new Review{ 
        Id = 21, 
        Restaurant = restaurant20, 
        Rating = rating2, 
        Reviewer = Fixtures.reviewer2};
      _ctx.Restaurants.Add(restaurant20);
      _ctx.Reviews.Add(review20);
      _ctx.SaveChanges();
      var expextedAverageRating = (rating1 + rating2) / 2;
      //When
      var createdReview = _svc.Create(review21);
      //Then

      Assert.Equal(expextedAverageRating, _ctx.Restaurants.Find(20).AverageRating);
    }


    [Fact]
    public void ThrowExpcetion()
    {
      // Given 
      var invalidReview1 = new Review{
        Id = 99,
        Restaurant = new Restaurant{ Id = 99},
        Reviewer = Fixtures.reviewer1
      };
      var invalidReview2 = new Review{
        Id = 99,
        Restaurant = Fixtures.restaurant1,
        Reviewer = new User{ Id = 99}
      };
      //When
      Action action1 = () => _svc.Create(invalidReview1);
      Action action2 = () => _svc.Create(invalidReview2);
      //Then
      Assert.Throws<PleyNotFoundException>(action1);
      Assert.Throws<PleyNotFoundException>(action2);
    }
  }

  public class ReviewService_Reply_Should_ : ReviewServiceTest
  {
    [Fact]
    public void UpdateReview()
    {
      //Given
      var reply = "This is the owner's reply.";
      int reviewId = 1;
      //When
      var ret = _svc.Reply(reviewId, reply);
      //Then
      Assert.Equal(reply, _ctx.Reviews.Find(reviewId).OwnerReply);
    }

    [Fact]
    public void ReturnExcpetion()
    {
      //Given
      Action action = () => _svc.Reply(0, "dummy");      
      //Then
      Assert.Throws<PleyNotFoundException>(action);
    }
  }

}