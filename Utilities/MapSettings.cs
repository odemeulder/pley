using AutoMapper;
using Pley.Models;
using Pley.Dtos;

namespace Pley {
  public class UserProfile : Profile
  {
      public UserProfile()
      {
          CreateMap<User, UserDto>();
          CreateMap<UserDto, User>();
          CreateMap<Restaurant, RestaurantDto>();
          CreateMap<RestaurantDto, Restaurant>();
          CreateMap<Review, ReviewDto>();
          CreateMap<ReviewDto, Review>();
      }
  }
}