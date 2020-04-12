using System;
using System.Text;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Pley.Models;

namespace Pley.Services {

  public interface IUserService {
    User GetUser(int id);
    IList<User> GetAllUsers();
    User CreateUser(User user, string password);
    User Authenticate(string login, string password);
    User Update(User user, string password);
    void Delete(int id);
  }

  public class UserService : IUserService
  {
    private PleyContext _dbContext;
    private ILogger _logger;
    public UserService(PleyContext context, ILogger<UserService> logger)
    {
      _dbContext = context;
      _logger = logger;
    }

    public User Authenticate(string login, string password)
    {
      if (string.IsNullOrWhiteSpace(login) || string.IsNullOrWhiteSpace(password)) {
        throw new PleyException("Login and password cannot be empty");
      }
      var user = _dbContext.Users.FirstOrDefault(u => u.Email == login);
      if (user == null) {
        return null;
      }
      using (var hmac = new System.Security.Cryptography.HMACSHA512(user.PasswordSalt))
      {
          var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
          for (int i = 0; i < hash.Length; i++)
          {
              if (hash[i] != user.PasswordHash[i]) return null;
          }
      }
      return user;
    }

    public User CreateUser(User user, string password)
    {
      if (String.IsNullOrWhiteSpace(password)) {
        throw new PleyException("Password cannot be blank");
      }
      if (_dbContext.Users.Any(u => u.Email == user.Email)) {
        throw new PleyException("User already exists.");
      }

      (user.PasswordSalt, user.PasswordHash) = CreatePasswordHash(password);
      user.CreatedOn = DateTime.Now;
      user.ModifiedOn = DateTime.Now;
      _dbContext.Users.Add(user);
      _dbContext.SaveChanges();
      return user;
    }

    public void Delete(int id)
    {
      var user = _dbContext.Users.Find(id);
      if (user == null) {
        throw new PleyException("User not found, cannot delete");
      }
      _dbContext.Users.Remove(user);
      _dbContext.SaveChanges();
    }

    public IList<User> GetAllUsers()
    {
      return _dbContext.Users.ToList();
    }

    public User GetUser(int id)
    {
      return _dbContext.Users.FirstOrDefault(u => u.Id == id);
    }

    public User Update(User user, string password)
    {
      var existingUser = _dbContext.Users.Find(user.Id);
      if (existingUser == null) {
        throw new PleyNotFoundException("User not found");
      }
      if (user.Email != existingUser.Email) {
        if (_dbContext.Users.Any(u => u.Email == user.Email)) {
          throw new PleyException("Email is already taken.");
        }
      }
      existingUser.FirstName = user.FirstName;
      existingUser.LastName = user.LastName;
      existingUser.Email = user.Email;
      if (!String.IsNullOrWhiteSpace(password)) {
        (existingUser.PasswordHash, existingUser.PasswordSalt) = CreatePasswordHash(password);
      }
      existingUser.Type = user.Type;
      existingUser.ModifiedOn = System.DateTime.Now;
      _dbContext.Users.Update(existingUser);
      _dbContext.SaveChanges();
      return existingUser;
    }

    private static (byte[], byte[]) CreatePasswordHash(string password)
    {
      if (password == null) {
        throw new ArgumentNullException("password");
      }
      if (string.IsNullOrWhiteSpace(password)) {
        throw new ArgumentException("Password cannot be empty or whitespace only string.");
      }

      using (var hmac = new System.Security.Cryptography.HMACSHA512())
      {
        byte[] passwordSalt = hmac.Key;
        byte[] passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        return (passwordSalt, passwordHash);
      }
    }
  }

}