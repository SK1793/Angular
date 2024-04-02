

using Microsoft.EntityFrameworkCore;

namespace SampleApi.Models
{
    public class NotesDetailsContext : DbContext
    {
        public NotesDetailsContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<NotesDetails> NotesDetails { get; set; }
    }
}
