using Moq;
using Pley.Models;
using Microsoft.Extensions.Logging;

namespace Pley.Services.Tests 
{
  public static class ReviewServiceFactory
  {
    public static ReviewService Create(PleyContext context) {
      var logger = new Mock<ILogger<ReviewService>>();
      var restaurantSvc = RestaurantServiceFactory.Create(context);
      return new ReviewService(context, restaurantSvc, logger.Object);
    }
  }
}