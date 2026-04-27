using FluentValidation;
using Terra.Api.Controllers;

namespace Terra.Api.Validators;

public class CreateTodoRequestValidator : AbstractValidator<CreateTodoRequest>
{
    public CreateTodoRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Görev başlığı boş olamaz.")
            .MinimumLength(3).WithMessage("Görev başlığı en az 3 karakter olmalıdır.")
            .MaximumLength(100).WithMessage("Görev başlığı 100 karakterden uzun olamaz.");
    }
}

public class UpdateTodoRequestValidator : AbstractValidator<UpdateTodoRequest>
{
    public UpdateTodoRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Görev başlığı boş olamaz.")
            .MinimumLength(3).WithMessage("Görev başlığı en az 3 karakter olmalıdır.");
    }
}
