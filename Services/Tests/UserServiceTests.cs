using System.Linq;
using System.Collections.Generic;
using Xunit;
using Moq;
using Pley.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Pley.Services.Tests {

  public class UserService_Authenticate_Should {
    private UserService svc;
    private Mock<PleyContext> mockContext;
    private Mock<ILogger<UserService>> _mockLog;
    public UserService_Authenticate_Should()
    {
      this.mockContext = new Mock<PleyContext>();
      _mockLog = new Mock<ILogger<UserService>>();
      svc = new UserService(this.mockContext.Object, _mockLog.Object);
    }

    [Fact]
    public void TaskReturnAUserWhenPasswordCorrect()
    {
      //Given
      var hmac = new System.Security.Cryptography.HMACSHA512();
      var password = "The Password";
      var email = "a@a.com";
      var user = new User { 
          FirstName = "Alice", 
          LastName = "Apple", 
          Email = email,
          PasswordSalt = hmac.Key, 
          PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password))
      };
      var data = new List<User>{ user }.AsQueryable();
      hmac.Dispose();

      var mockSet = new Mock<DbSet<User>>();
      mockSet.As<IQueryable<User>>().Setup(m => m.Provider).Returns(data.Provider);
      mockSet.As<IQueryable<User>>().Setup(m => m.Expression).Returns(data.Expression);
      mockSet.As<IQueryable<User>>().Setup(m => m.ElementType).Returns(data.ElementType);
      mockSet.As<IQueryable<User>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

      var mockContext = new Mock<PleyContext>();
      this.mockContext.Setup(m => m.Users).Returns(mockSet.Object);
    
      //When
      var correctPassword = svc.Authenticate(email, password);
      var incorrectPassword = svc.Authenticate(email, "wrong password");

      //Then
      Assert.NotNull(correctPassword);
      Assert.Null(incorrectPassword);
    }

    [Fact]
    public void ReturnNullWhenEmailEmpty()
    {
      //Given
      var data = new List<User>{
        new User { FirstName = "Alice", LastName = "Apple", PasswordHash = new byte[64], PasswordSalt = new byte[64]}
      }.AsQueryable();
      
      var mockSet = new Mock<DbSet<User>>();
      mockSet.As<IQueryable<User>>().Setup(m => m.Provider).Returns(data.Provider);
      mockSet.As<IQueryable<User>>().Setup(m => m.Expression).Returns(data.Expression);
      mockSet.As<IQueryable<User>>().Setup(m => m.ElementType).Returns(data.ElementType);
      mockSet.As<IQueryable<User>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

      var mockContext = new Mock<PleyContext>();
      this.mockContext.Setup(m => m.Users).Returns(mockSet.Object);
    
    //When
    var user = svc.Authenticate("a", "b");

    //Then
      Assert.Null(user);
    }

  }

}