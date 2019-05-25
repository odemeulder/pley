using Pley.Models;
using System.Collections.Generic;

namespace Pley.Services 
{
  public interface IRestaurantService
  {
    Restaurant Create(Restaurant restaurant);
    Restaurant Update(Restaurant restaurant);
    Restaurant Delete(int id);
    Restaurant Get(int id);
    IList<Restaurant> GetAll();
    IList<Review> GetReviews(int restaurantId);
  }
}