namespace Pley.Dtos {
  
  public class RestaurantDto {

    public int Id { get; set; }
    public UserDto Owner { get; set; }
    public string RestaurantName { get; set; }
    public int AverageRating { get; set; }
    public string Street { get; set; }
    public string State { get; set; }
    public string Zip { get; set; }
    public string City { get; set; }
  }
}