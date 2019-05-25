using System.Linq;
using System.Web.Http;
using System.Collections.Generic;
using Xunit;
using Moq;
using AutoMapper;
using Pley.Models;
using Pley.Services;
using Pley.Dtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc;

namespace Pley.Controllers.Tests {

  public class GetUsersShould
  {
    private Mock<IUserService> _svc;
    private UserController _controller;
    public GetUsersShould()
    {
      _svc = new Mock<IUserService>();
      _controller = UserControllerFactory.Create(_svc.Object);
    }

    [Fact]
    public void ReturnAllUsers()
    {
      //Given
      _svc.Setup(s => s.GetAllUsers()).Returns(UserFixtures.GetUsers());
      //When
      var okResult = _controller.GetUsers();
      var a = okResult as OkObjectResult;
      var b = a.Value;
      //Then
      Assert.IsType<OkObjectResult>(okResult);
    }
  }

  public class GetUserShould
  {
    private Mock<IUserService> _svc;
    private UserController _controller;
    public GetUserShould()
    {
      _svc = new Mock<IUserService>();
      _controller = UserControllerFactory.Create(_svc.Object);
    }
    [Fact]
    public void ReturnOk()
    {
      //Given
      _svc.Setup(s => s.GetUser(It.IsAny<int>())).Returns(UserFixtures.ValidUser());
      //When
      var ok = _controller.GetUser(It.IsAny<int>());
      var a = (ok as OkObjectResult)?.Value;

      //Then
      Assert.IsType<OkResult>(ok);
      Assert.IsType<UserDto>(a);
    }
    [Fact]
    public void ReturnNotFound()
    {
      //Given
      _svc.Setup(s => s.GetUser(It.IsAny<int>())).Returns(default(User));
      //When
      var resp = _controller.GetUser(It.IsAny<int>());
      //Then
      Assert.IsType<NotFoundResult>(resp);
    }
  }

  public class UpdateUserShould
  {
    private Mock<IUserService> _svc;
    private UserController _controller;
    public UpdateUserShould()
    {
      _svc = new Mock<IUserService>();
      _controller = UserControllerFactory.Create(_svc.Object);
    }

    [Fact]
    public void ReturnOkWhenUserFound()
    {
      //Given
      _svc.Setup(s => s.Update(It.IsAny<User>(), It.IsAny<string>()))
        .Returns(UserFixtures.ValidUser());
      //When
      var rv = _controller.Update(UserFixtures.DtoUser());
      //Then
      Assert.IsType<OkResult>(rv);
    }
    [Fact]
    public void ReturnNotFound()
    {
      //Given
      _svc.Setup(s => s.Update(It.IsAny<User>(), It.IsAny<string>()))
        .Returns(default(User));
      //When
      var rv = _controller.Update(UserFixtures.DtoUser());
      //Then
      Assert.IsType<NotFoundResult>(rv);
    }
  }

  public static class UserControllerFactory {
    public static UserController Create(IUserService svc) {
      var logger = new Mock<ILogger<UserController>>();
      var appSettings = new Mock<IOptions<AppSettings>>();
      var mapper = new Mock<IMapper>();
      return new UserController(svc, mapper.Object, logger.Object, appSettings.Object);
    }
  }

  public static class UserFixtures {
    private static User user1 = new User { 
      Id = 1,
      FirstName = "Alice", 
      LastName = "Apple", 
      Email = "a@a.com",
      PasswordSalt = new byte[64], 
      PasswordHash = new byte[64]
    };
    private static User user2 = new User { 
      Id = 2,
      FirstName = "Bob", 
      LastName = "Banana", 
      Email = "b@b.com",
      PasswordSalt = new byte[64], 
      PasswordHash = new byte[64]
    };
    private static User user3 = new User { 
      Id = 3,
      FirstName = "Charlie", 
      LastName = "Coconut", 
      Email = "c@c.com",
      PasswordSalt = new byte[64], 
      PasswordHash = new byte[64]
    };
    private static UserDto dtoUser1 = new UserDto { 
      Id = 1,
      FirstName = "Alice", 
      LastName = "Apple", 
      Email = "a@a.com"
    };

    public static List<User> GetUsers() => new List<User>{user1, user2};
    public static User ValidUser() => user1;
    public static User InValidUser() => user3;
    public static UserDto DtoUser() => dtoUser1;
  }
}