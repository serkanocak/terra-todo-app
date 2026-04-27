using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Terra.Api.Controllers;
using Terra.Api.Data;
using Terra.Api.Models;
using Xunit;

namespace Terra.Tests;

public class TodosControllerTests
{
    private readonly AppDbContext _context;
    private readonly TodosController _controller;

    public TodosControllerTests()
    {
        // Gerçek veritabanı yerine "In-Memory" (Bellek içi) DB kullanıyoruz
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new AppDbContext(options);
        _controller = new TodosController(_context);
    }

    [Fact]
    public async Task GetAll_ShouldReturnAllTodos()
    {
        // Arrange (Hazırlık)
        _context.Todos.Add(new TodoItem { Title = "Test Todo 1" });
        _context.Todos.Add(new TodoItem { Title = "Test Todo 2" });
        await _context.SaveChangesAsync();

        // Act (Eylem)
        var result = await _controller.GetAll();

        // Assert (Doğrulama)
        var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        var todos = okResult.Value.Should().BeAssignableTo<IEnumerable<TodoItem>>().Subject;
        todos.Should().HaveCount(2);
    }

    [Fact]
    public async Task Create_ShouldAddNewTodo()
    {
        // Arrange
        var request = new CreateTodoRequest("Yeni Görev");

        // Act
        var result = await _controller.Create(request);

        // Assert
        result.Should().BeOfType<CreatedAtActionResult>();
        _context.Todos.Should().HaveCount(1);
        _context.Todos.First().Title.Should().Be("Yeni Görev");
    }

    [Fact]
    public async Task Delete_WithInvalidId_ShouldReturnNotFound()
    {
        // Act
        var result = await _controller.Delete(Guid.NewGuid());

        // Assert
        result.Should().BeOfType<NotFoundResult>();
    }
}
