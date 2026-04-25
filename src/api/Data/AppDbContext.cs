using Microsoft.EntityFrameworkCore;
using Terra.Api.Models;

namespace Terra.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // Bu satır: "Veritabanında 'Todos' adında bir tablo olacak
    // ve her satır bir TodoItem nesnesi olacak" demek.
    public DbSet<TodoItem> Todos { get; set; }
}
