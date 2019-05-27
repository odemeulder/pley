using System;
using System.Linq;
using Pley.Models;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Pley.Services 
{
  public interface IReviewService
  {
    Review Create(Review Review);
    Review Update(Review Review);
    Review Reply(int id, string reply);
    void Delete(int id);
    Review Get(int id);
    IList<Review> GetAll();
  }

  public class ReviewService : IReviewService
  {
    private PleyContext _dbContext;
    private IRestaurantService _restaurantSvc;
    private ILogger _logger;
    
    public ReviewService(
      PleyContext context, 
      IRestaurantService svc, 
      ILogger<ReviewService> logger
    ) {
      _dbContext = context;
      _logger = logger;
      _restaurantSvc = svc;
    }

    public Review Create(Review review)
    {
      if (review.Restaurant == null) throw new ArgumentException("Need to provide restaurant id");
      if (_dbContext.Restaurants.Find(review.Restaurant.Id) == null)
        throw new PleyNotFoundException("Restaurant for review not found");
      if (_dbContext.Users.Find(review.Reviewer.Id) == null)
        throw new PleyNotFoundException("User for review not found");

      review.CreatedOn = DateTime.Now;
      review.ModifiedOn = DateTime.Now;
      _dbContext.Reviews.Add(review);
      _dbContext.SaveChanges();
      _restaurantSvc.UpdateAverageRating(review.Restaurant.Id);
      return review;
    }

    public void Delete(int id)
    {
      var Review = _dbContext.Reviews.Find(id);
      if (Review == null) throw new PleyNotFoundException("Review not found");
      _dbContext.Reviews.Remove(Review);
      _dbContext.SaveChanges();
    }

    public Review Get(int id)
    {
      var review = _dbContext
        .Reviews
        .Include(r => r.Reviewer)
        .Include(r => r.Restaurant)
        .FirstOrDefault(r => r.Id == id);
      if (review == null) throw new PleyNotFoundException("Review not found");
      return review;
    }

    public IList<Review> GetAll()
    {
      return _dbContext
        .Reviews
        .Include(r => r.Reviewer)
        .Include(r => r.Restaurant)
        .ToList();
    }

    public Review Reply(int id, string reply)
    {
      var review = _dbContext
        .Reviews
        .Include(r => r.Reviewer)
        .FirstOrDefault(r => r.Id == id);
      if (review == null) throw new PleyNotFoundException("Review not found");
      review.ModifiedOn = DateTime.Now;
      review.OwnerReply = reply;
      _dbContext.Reviews.Update(review);
      _dbContext.SaveChanges();
      return review;    
    }

    public Review Update(Review Review)
    {
      var existing = _dbContext
        .Reviews
        .Include(r => r.Reviewer)
        .FirstOrDefault(r => r.Id == Review.Id);

      if (existing == null) throw new PleyNotFoundException("Review not found");
      existing.ModifiedOn = DateTime.Now;
      existing.CustomerReview = Review.CustomerReview;
      existing.OwnerReply = Review.OwnerReply;
      existing.Rating = Review.Rating;
      existing.VisitDate = Review.VisitDate;
      _dbContext.Reviews.Update(existing);
      _dbContext.SaveChanges();
      return existing;
    }

  }
}