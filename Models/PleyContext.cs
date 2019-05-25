using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Pley.Models {

  public class PleyContext : DbContext {
    public PleyContext(DbContextOptions<PleyContext> options)
            : base(options)
        { }

    protected PleyContext() {}

    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Restaurant> Restaurants { get; set; }
    public virtual DbSet<Review> Reviews { get; set; }
  }
}