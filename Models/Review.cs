using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace Pley.Models {
  
  public class Review : BaseEntity {

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public User Reviewer { get; set; }
    public Restaurant Restaurant { get; set; }
    public DateTime VisitDate {get; set;}
    public string CustomerReview { get; set; }
    public string OwnerReply { get; set; }
    public byte Rating { get; set; }

  }
}