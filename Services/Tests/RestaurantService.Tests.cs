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
  public abstract class RestaurantServiceTest
  {
    protected PleyContext _ctx;
    protected RestaurantService _svc;
    public RestaurantServiceTest()
    {
      _ctx = PleyContextFactory.Create();
      _svc = RestaurantServiceFactory.Create(_ctx);
    }
  }

  public class RestaurantService_GetRestaurants_Should_ : RestaurantServiceTest
  {
    [Fact]
    public void ReturnRestaurants()
    {
      //Given
      var expectedCount = _ctx.Restaurants.Count();
      //When
      var ret = _svc.GetAll();
      //Then
      Assert.Equal(expectedCount, ret.Count);
    }
  }

  public class RestaurantService_GetRestaurantById_Should_ : RestaurantServiceTest
  {
    [Fact]
    public void ReturnRestaurant()
    {
      //Given
      var restaurantId = 1;
      var expextedRestaurant = _ctx.Restaurants
        .FirstOrDefault(r => r.Id == restaurantId);
      //When
      var ret = _svc.Get(restaurantId);
      //Then
      Assert.Equal(expextedRestaurant.RestaurantName, ret.RestaurantName);
      Assert.Equal(expextedRestaurant.AverageRating, ret.AverageRating);
    }
    [Fact]
    public void ThrowException()
    {
      //Given
      Action action = () => _svc.Get(0);
      //Then
      Assert.Throws<PleyNotFoundException>(action);
    }
  }

  public class RestaurantService_CreateRestaurant_Should_ : RestaurantServiceTest
  {
    [Fact]
    public void ShouldAddNewRestaurant()
    {
      //Given
      var newRestaurantId = 10;
      var newRestaurant = new Restaurant{
        Id = newRestaurantId,
        Owner = Fixtures.owner1
      };
      var expectedCount = _ctx.Restaurants.Count() + 1;      
      //When
      var ret = _svc.Create(newRestaurant);
      //Then
      Assert.Equal(expectedCount, _ctx.Restaurants.Count());
      Assert.Equal(newRestaurantId, ret.Id);
    }
    [Fact]
    public void ThrowException()
    {
      //Given
      var newRestaurantId = 11;
      var newRestaurant = new Restaurant{
        Id = newRestaurantId,
        Owner = new User{Id = 11}
      };      
      //When
      Action action = () => _svc.Create(newRestaurant);
      //Then
      Assert.Throws<PleyNotFoundException>(action);
    }
  }

}