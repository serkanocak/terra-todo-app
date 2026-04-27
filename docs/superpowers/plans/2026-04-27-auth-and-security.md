# Google OAuth2 & Security Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Secure the Terra Todo App by restricting infrastructure access, implementing Google Login, and enforcing user data isolation.

**Architecture:** We will use `@react-oauth/google` for frontend authentication, `Google.Apis.Auth` for backend token validation, and issue local JWTs for session management. Data isolation is achieved by adding a `UserId` field to the Todo model and filtering all queries.

**Tech Stack:** .NET 8, React, PostgreSQL, Terraform, JWT, Google OAuth2.

---

### Task 1: Infrastructure Security Hardening (Terraform)

**Files:**
- Modify: `terraform/ec2_instance.tf`

- [ ] **Step 1: Restrict PostgreSQL and SSH access**
Modify the security group to close 5432 to the public and restrict 22.

```hcl
# terraform/ec2_instance.tf modifications
resource "aws_security_group" "ec2_sg" {
  # ... (other ports)

  # SSH - Restrict to a placeholder IP or remove 0.0.0.0/0
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["YOUR_IP/32"] # Replace with actual IP or a more restrictive range
  }

  # PostgreSQL - REMOVE public access. Internal access is still allowed within VPC.
  # Delete the previous ingress for 5432 or comment it out.
}
```

- [ ] **Step 2: Apply Terraform changes**
Run: `cd terraform && terraform apply -auto-approve` (Note: Ensure AWS credentials are set)
Expected: Public access to 5432 is revoked.

- [ ] **Step 3: Commit**
```bash
git add terraform/ec2_instance.tf
git commit -m "infra: restrict public access to DB and SSH"
```

---

### Task 2: Database Schema Update & User Isolation

**Files:**
- Modify: `src/api/Models/TodoItem.cs`
- Create: New EF Core Migration
- Modify: `src/api/Data/AppDbContext.cs`

- [ ] **Step 1: Add UserId to TodoItem**
```csharp
namespace Terra.Api.Models;

public class TodoItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string UserId { get; set; } = string.Empty; // New field
}
```

- [ ] **Step 2: Create migration and clean existing data**
Run: `dotnet ef migrations add AddUserIdToTodo -p src/api/Terra.Api.csproj`
Run: `dotnet ef database update -p src/api/Terra.Api.csproj`
Expected: Database updated with UserId column. (The app already has `dbContext.Database.Migrate()` in Program.cs which is good).

- [ ] **Step 3: Clear existing data (One-time script or manual)**
Run: `docker exec -it terra-db psql -U user -d terradb -c "DELETE FROM \"Todos\";"`

- [ ] **Step 4: Commit**
```bash
git add src/api/Models/TodoItem.cs src/api/Migrations/
git commit -m "db: add UserId to TodoItem and clear old data"
```

---

### Task 3: Backend Auth Infrastructure (JWT & Google)

**Files:**
- Modify: `src/api/Terra.Api.csproj` (Add packages)
- Modify: `src/api/Program.cs`
- Modify: `src/api/appsettings.json`

- [ ] **Step 1: Add required NuGet packages**
Run: `dotnet add src/api/Terra.Api.csproj package Google.Apis.Auth`
Run: `dotnet add src/api/Terra.Api.csproj package Microsoft.AspNetCore.Authentication.JwtBearer`

- [ ] **Step 2: Configure JWT and Auth in Program.cs**
```csharp
// Add to builder.Services
builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// Add app.UseAuthentication() BEFORE app.UseAuthorization()
app.UseAuthentication();
app.UseAuthorization();
```

- [ ] **Step 3: Commit**
```bash
git add src/api/Terra.Api.csproj src/api/Program.cs
git commit -m "feat: setup JWT authentication infrastructure"
```

---

### Task 4: Auth Controller & Filtered Todos

**Files:**
- Create: `src/api/Controllers/AuthController.cs`
- Modify: `src/api/Controllers/TodosController.cs`

- [ ] **Step 1: Create AuthController for Google Token Exchange**
Implement an endpoint `/api/auth/google` that validates the ID Token and returns a JWT.

- [ ] **Step 2: Add [Authorize] and Filter by UserId in TodosController**
```csharp
[Authorize]
public class TodosController : ControllerBase {
    // ...
    private string UserId => User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

    [HttpGet]
    public async Task<IActionResult> GetAll() {
        return Ok(await _db.Todos.Where(t => t.UserId == UserId).ToListAsync());
    }
    // ... update Create, Update, Delete to check UserId
}
```

- [ ] **Step 3: Commit**
```bash
git add src/api/Controllers/
git commit -m "feat: implement Google auth endpoint and user isolation"
```

---

### Task 5: Frontend Google Login & Interceptors

**Files:**
- Modify: `src/web/package.json`
- Modify: `src/web/src/main.tsx`
- Modify: `src/web/src/api.ts`
- Create: `src/web/src/components/Login.tsx`

- [ ] **Step 1: Install frontend dependencies**
Run: `cd src/web && npm install @react-oauth/google axios`

- [ ] **Step 2: Wrap App with GoogleOAuthProvider**
Update `main.tsx` with `clientId` from env.

- [ ] **Step 3: Setup Axios Interceptor for JWT**
Update `api.ts` to include the token from `localStorage` in every request.

- [ ] **Step 4: Commit**
```bash
git add src/web/
git commit -m "feat: integrate google login on frontend"
```

---

### Task 6: Production Hardening & Cleanup

**Files:**
- Modify: `src/api/Program.cs`
- Modify: `docker-compose.yml`

- [ ] **Step 1: Disable Swagger in Prod**
```csharp
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}
```

- [ ] **Step 2: Use Environment Variables for API URL**
Update `docker-compose.yml` to remove hardcoded IPs and use service names or dynamic envs.

- [ ] **Step 3: Final Verification**
Test the full flow: Login -> Create Todo -> Logout -> Login with another user -> Verify isolation.

- [ ] **Step 4: Commit**
```bash
git add .
git commit -m "chore: final production hardening and cleanup"
```
