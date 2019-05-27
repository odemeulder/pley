using System;
using System.Text;
using System.Linq;
using System.Collections.Generic;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using AutoMapper;
using Pley;
using Pley.Models;
using Pley.Dtos;
using Pley.Services;

namespace Pley.Controllers {
    
  [Authorize]
  [Route("api/users")]
  public class UserController : Controller {

    private IUserService _svc;
    private IMapper _mapper;
    private ILogger _logger;
    private readonly AppSettings _appSettings;

    public UserController(IUserService svc,
      IMapper mapper,
      ILogger<UserController> logger,
      IOptions<AppSettings> appSettings
    ) {
      _svc = svc;
      _mapper = mapper;
      _logger = logger;
      _appSettings = appSettings.Value;
    }

    [HttpPost]
    [Route("auth")]
    [AllowAnonymous]
    public IActionResult AuthenticateUser([FromBody]UserDto dto) {
      try {
        var user = _svc.Authenticate(dto.Email, dto.Password);
        if (user == null) {
          return BadRequest(new { message = "Invalid username or password"});
        }
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.JwtSecret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[] 
            {
                new Claim(ClaimTypes.Name, user.Id.ToString())
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        // return basic user info (without password) and token to store client side
        return Ok(new {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Token = tokenString
        });
      } catch (Exception ex) {
        return BadRequest(new { message = ex.Message });
      }      
    }

    [HttpGet]
    public IActionResult GetUsers() {
      try {
        var users = _mapper.Map<IList<UserDto>>(_svc.GetAllUsers());
        return Ok(users);
      } catch (Exception ex) {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpGet]
    [Route("{id?}")]
    public IActionResult GetUser([FromRoute] int id) {
      try {
        var user = _mapper.Map<UserDto>(_svc.GetUser(id));
        if (user == null) {
          return NotFound();
        }
        return Ok(user);
      } catch (Exception ex) {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpPut]
    public IActionResult Update([FromBody]UserDto dto) {
      try {
        var user = _mapper.Map<User>(dto);
        var rv = _svc.Update(user, dto.Password);
        if (rv == null) {
          return NotFound();
        }
        return Ok();
      } catch (Exception ex) {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpPost]
    [AllowAnonymous]
    public IActionResult Register([FromBody]UserDto dto) {
      try {
        var user = _mapper.Map<User>(dto);
        _svc.CreateUser(user, dto.Password);
        return Ok();
      } catch (Exception ex) {
        return BadRequest(new { message = ex.Message });
      }
    }
  }

}