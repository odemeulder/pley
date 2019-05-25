using System;

namespace Pley.Models {
  public abstract class BaseEntity {
    public DateTime CreatedOn { get; set; }
    public DateTime ModifiedOn { get; set; }
  }
}