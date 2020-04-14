using System.Collections.Generic;
using Xunit;
using Moq;
using AutoMapper;
using Pley.Models;
using Pley.Services;
using Pley.Dtos;
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
      var svc = new Mock<IUserService>();
      svc.Setup(s => s.GetAllUsers()).Returns(UserFixtures.GetUsers());
      var controller = UserControllerFactory.Create(svc.Object);

      //When
      var okResult = controller.GetUsers();

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
      var ctrl = UserControllerFactory.Create(_svc.Object);
      //When
      var ok = ctrl.GetUser(99);
      var a = (ok as OkObjectResult)?.Value;

      //Then
      Assert.IsType<OkObjectResult>(ok);
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
      Assert.IsType<NotFoundObjectResult>(resp);
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
      Assert.IsType<OkObjectResult>(rv);
    }
    [Fact]
    public void ReturnNotFound()
    {
      //Given
      _svc.Setup(s => s.Update(It.IsAny<User>(), It.IsAny<string>()))
        .Throws(new PleyNotFoundException(It.IsAny<string>()));
      //When
      var rv = _controller.Update(UserFixtures.DtoUser());
      //Then
      Assert.IsType<NotFoundObjectResult>(rv);
    }
  }

  public static class UserControllerFactory {
    public static UserController Create(IUserService svc) {
      var logger = new Mock<ILogger<UserController>>();
      var appSettings = new Mock<IOptions<AppSettings>>();
      var config = new MapperConfiguration(cfg => {
          cfg.AddProfile<PleyProfile>();
      });
      IMapper mapper = new Mapper(config);
      return new UserController(svc, mapper, logger.Object, appSettings.Object);
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
    private static UserDto dtoUser2 = new UserDto { 
      Id = 2,
      FirstName = "Bob", 
      LastName = "Banana", 
      Email = "b@b.com",
    };

    public static List<User> GetUsers() => new List<User>{user1, user2};
    public static List<UserDto> GetDtoUsers() => new List<UserDto>{dtoUser1, dtoUser1};
    public static User ValidUser() => user1;
    public static User InValidUser() => user3;
    public static UserDto DtoUser() => dtoUser1;
  }
}