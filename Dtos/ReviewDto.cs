using System;

namespace Pley.Dtos {
  
  public class ReviewDto {

    public int Id { get; set; }
    public UserDto Reviewer { get; set; }
    public RestaurantDto Restaurant { get; set; }
    public DateTime VisitDate {get; set;}
    public string CustomerReview { get; set; }
    public string OwnerReply { get; set; }
    public byte Rating { get; set; }
  }
}