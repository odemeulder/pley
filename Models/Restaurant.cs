using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
namespace Pley.Models {
  
  public class Restaurant : BaseEntity {

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public User Owner { get; set; }
    public string RestaurantName { get; set; }
    public int AverageRating { get; set; }
    public string Street { get; set; }
    public string State { get; set; }
    public string Zip { get; set; }
    public string City { get; set; }
    public IList<Review> Reviews { get; set; }
  }
}