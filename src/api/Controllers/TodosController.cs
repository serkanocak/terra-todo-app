using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Terra.Api.Data;
using Terra.Api.Models;

namespace Terra.Api.Controllers;

[ApiController]
[Route("api/[controller]")]    // → /api/todos
public class TodosController : ControllerBase
{
    private readonly AppDbContext _db;

    // DbContext burada Dependency Injection ile geliyor
    public TodosController(AppDbContext db)
    {
        _db = db;
    }

    // GET /api/todos  →  Tüm todo'ları listele
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var todos = await _db.Todos
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();

        return Ok(todos);
    }

    // GET /api/todos/{id}  →  Tek bir todo getir
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var todo = await _db.Todos.FindAsync(id);

        if (todo is null)
            return NotFound();  // 404

        return Ok(todo);        // 200
    }

    // POST /api/todos  →  Yeni todo oluştur
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTodoRequest request)
    {
        var todo = new TodoItem
        {
            Title = request.Title
        };

        _db.Todos.Add(todo);
        await _db.SaveChangesAsync();

        // 201 Created + yeni oluşturulan kaydın adresi
        return CreatedAtAction(nameof(GetById), new { id = todo.Id }, todo);
    }

    // PUT /api/todos/{id}  →  Todo güncelle
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateTodoRequest request)
    {
        var todo = await _db.Todos.FindAsync(id);

        if (todo is null)
            return NotFound();

        todo.Title = request.Title;
        todo.IsCompleted = request.IsCompleted;

        await _db.SaveChangesAsync();

        return Ok(todo);
    }

    // PATCH /api/todos/{id}/toggle  →  Tamamlandı/bekliyor durumunu değiştir
    [HttpPatch("{id}/toggle")]
    public async Task<IActionResult> Toggle(Guid id)
    {
        var todo = await _db.Todos.FindAsync(id);

        if (todo is null)
            return NotFound();

        todo.IsCompleted = !todo.IsCompleted;  // true → false, false → true
        await _db.SaveChangesAsync();

        return Ok(todo);
    }

    // DELETE /api/todos/{id}  →  Todo sil
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var todo = await _db.Todos.FindAsync(id);

        if (todo is null)
            return NotFound();

        _db.Todos.Remove(todo);
        await _db.SaveChangesAsync();

        return NoContent();  // 204 - Silindi, dönecek veri yok
    }
}

// DTO'lar — API'ye gelen istek gövdelerinin şekli
// (TodoItem'ın tamamını değil, sadece ihtiyaç duyulan alanları alırız)
public record CreateTodoRequest(string Title);
public record UpdateTodoRequest(string Title, bool IsCompleted);
