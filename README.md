# 📋 Terra Todo App

A full-stack Todo application built for learning modern DevOps and development practices.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Backend | C# .NET 8 Web API |
| Database | PostgreSQL |
| Container | Docker & Docker Compose |
| Infrastructure | Terraform on AWS |
| CI/CD | GitHub Actions |

## 🏗️ Architecture

```
[React] → [C# API] → [PostgreSQL]
   ↑           ↑
[Docker]   [Docker]
   ↓
[AWS ECS Fargate]
   ↑
[Terraform]
   ↑
[GitHub Actions CI/CD]
```

## 🚀 Quick Start

### Prerequisites
- Docker Desktop
- .NET 8 SDK
- Node.js 20+

### Run Locally
```bash
docker compose up
```

Frontend: http://localhost:5173  
API: http://localhost:5000  
Swagger: http://localhost:5000/swagger

## 📁 Project Structure

```
terra/
├── src/
│   ├── api/          # C# Backend
│   └── web/          # React Frontend
├── terraform/        # AWS Infrastructure
├── .github/
│   └── workflows/    # CI/CD Pipelines
└── docker-compose.yml
```

## 👤 Author

**serkanocak** — Built as interview preparation project.
