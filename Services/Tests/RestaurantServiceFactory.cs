using Moq;
using Pley.Models;
using Microsoft.Extensions.Logging;

namespace Pley.Services.Tests 
{
  public static class RestaurantServiceFactory
  {
    public static RestaurantService Create(PleyContext context) {
      var logger = new Mock<ILogger<RestaurantService>>();
      return new RestaurantService(context, logger.Object);
    }
  }
}