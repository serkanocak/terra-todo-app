using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Terra.Api.Controllers;
using Terra.Api.Data;
using Terra.Api.Models;
using Xunit;

namespace Terra.Tests;

public class TodosControllerTests
{
    private readonly AppDbContext _context;
    private readonly TodosController _controller;
    private const string TestUserId = "test-user-id";

    public TodosControllerTests()
    {
        // Gerçek veritabanı yerine "In-Memory" (Bellek içi) DB kullanıyoruz
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new AppDbContext(options);
        _controller = new TodosController(_context);

        // Mock User Claims
        var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
        {
            new Claim(ClaimTypes.NameIdentifier, TestUserId),
        }, "mock"));

        _controller.ControllerContext = new ControllerContext()
        {
            HttpContext = new DefaultHttpContext() { User = user }
        };
    }

    [Fact]
    public async Task GetAll_ShouldReturnOnlyUserTodos()
    {
        // Arrange (Hazırlık)
        _context.Todos.Add(new TodoItem { Title = "User Todo", UserId = TestUserId });
        _context.Todos.Add(new TodoItem { Title = "Other Todo", UserId = "other-user" });
        await _context.SaveChangesAsync();

        // Act (Eylem)
        var result = await _controller.GetAll();

        // Assert (Doğrulama)
        var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
        var todos = okResult.Value.Should().BeAssignableTo<IEnumerable<TodoItem>>().Subject;
        todos.Should().HaveCount(1);
        todos.First().Title.Should().Be("User Todo");
    }

    [Fact]
    public async Task Create_ShouldAddNewTodoWithUserId()
    {
        // Arrange
        var request = new CreateTodoRequest("Yeni Görev");

        // Act
        var result = await _controller.Create(request);

        // Assert
        result.Should().BeOfType<CreatedAtActionResult>();
        _context.Todos.Should().HaveCount(1);
        var createdTodo = _context.Todos.First();
        createdTodo.Title.Should().Be("Yeni Görev");
        createdTodo.UserId.Should().Be(TestUserId);
    }

    [Fact]
    public async Task Delete_WithInvalidId_ShouldReturnNotFound()
    {
        // Act
        var result = await _controller.Delete(Guid.NewGuid());

        // Assert
        result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task Delete_OtherUserTodo_ShouldReturnNotFound()
    {
        // Arrange
        var todo = new TodoItem { Title = "Other User Todo", UserId = "other-user" };
        _context.Todos.Add(todo);
        await _context.SaveChangesAsync();

        // Act
        var result = await _controller.Delete(todo.Id);

        // Assert
        result.Should().BeOfType<NotFoundResult>();
    }
}
