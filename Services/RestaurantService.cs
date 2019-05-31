using System;
using System.Linq;
using Pley.Models;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Pley.Services 
{
  public interface IRestaurantService
  {
    Restaurant Create(Restaurant restaurant);
    Restaurant Update(Restaurant restaurant);
    void Delete(int id);
    Restaurant Get(int id);
    IList<Restaurant> GetAll();
    IList<Review> GetReviews(int restaurantId);
    void UpdateAverageRating(int id);
  }

  public class RestaurantService : IRestaurantService
  {
    private PleyContext _dbContext;
    private ILogger _logger;
    
    public RestaurantService(PleyContext context, ILogger<RestaurantService> logger)
    {
      _dbContext = context;
      _logger = logger;
    }

    public Restaurant Create(Restaurant restaurant)
    {
      if (restaurant.Owner != null) {
        var owner = _dbContext.Users.Find(restaurant.Owner.Id);
        if (owner == null) throw new PleyNotFoundException("Owner not found");
        restaurant.Owner = owner;
      }
      restaurant.CreatedOn = DateTime.Now;
      restaurant.ModifiedOn = DateTime.Now;
      _dbContext.Restaurants.Add(restaurant);
      _dbContext.SaveChanges();
      return restaurant;
    }

    public void Delete(int id)
    {
      var restaurant = _dbContext
        .Restaurants
        .Include(r => r.Reviews) // including review for cascading delete
        .FirstOrDefault(r => r.Id == id);
      if (restaurant == null) throw new PleyNotFoundException("Restaurant not found");
      _dbContext.Restaurants.Remove(restaurant);
      _dbContext.SaveChanges();
    }

    public Restaurant Get(int id)
    {
      var restaurant = _dbContext
        .Restaurants
        .Include(r => r.Owner)
        .FirstOrDefault(r => r.Id == id);
      if (restaurant == null) throw new PleyNotFoundException("Restaurant not found");
      return restaurant;
    }

    public IList<Restaurant> GetAll()
    {
      return _dbContext.Restaurants.Include(r => r.Owner).ToList();
    }

    public IList<Review> GetReviews(int restaurantId)
    {
      var restaurant = _dbContext.Restaurants.Find(restaurantId);
      if (restaurant == null) throw new PleyNotFoundException("Restaurant not found");
      return restaurant.Reviews;
    }

    public Restaurant Update(Restaurant restaurant)
    {
      var existing = _dbContext
        .Restaurants
        .Include(r => r.Owner)
        .FirstOrDefault(r => r.Id == restaurant.Id);
      if (existing == null) throw new PleyNotFoundException("Restaurant not found");

      if (restaurant.Owner != null) {
        var owner = _dbContext.Users.Find(restaurant.Owner.Id);
        if (owner == null) throw new PleyNotFoundException("Owner not found");
        existing.Owner = owner;
      }

      existing.ModifiedOn = DateTime.Now;
      existing.RestaurantName = restaurant.RestaurantName;
      existing.Street = restaurant.Street;
      existing.State = restaurant.State;
      existing.Zip = restaurant.Zip;
      existing.City = restaurant.City;
      _dbContext.Restaurants.Update(existing);
      _dbContext.SaveChanges();
      return existing;
    }

    public void UpdateAverageRating(int id)
    {
      var restaurant = _dbContext
        .Restaurants
        .Include(r => r.Reviews)
        .FirstOrDefault(r => r.Id == id);
      if (restaurant == null) throw new ArgumentException("Restaurant not found");

      var numReviews = restaurant.Reviews.Count();
      if (numReviews == 0) return;

      restaurant.AverageRating = restaurant.Reviews.Sum(r => r.Rating) / numReviews;
      _dbContext.Restaurants.Update(restaurant);
      _dbContext.SaveChanges();
    }
  }
}