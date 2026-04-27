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

## 🚀 CI/CD Setup

This project uses GitHub Actions for automated deployment to AWS.

### Required GitHub Secrets
To make the pipeline work, you must add the following secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

| Secret Name | Description |
|-------------|-------------|
| `AWS_ACCESS_KEY_ID` | IAM User Access Key |
| `AWS_SECRET_ACCESS_KEY` | IAM User Secret Key |
| `AWS_REGION` | AWS Region (e.g., `eu-central-1`) |
| `AWS_ACCOUNT_ID` | Your AWS Account ID (for ECR URL) |
| `EC2_INSTANCE_ID` | The ID of the target EC2 instance |
| `POSTGRES_DB` | Database name |
| `POSTGRES_USER` | Database username |
| `POSTGRES_PASSWORD` | Database password |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `JWT_KEY` | Secret key for JWT signing |
| `JWT_ISSUER` | JWT Issuer (e.g., `TerraApi`) |
| `JWT_AUDIENCE` | JWT Audience (e.g., `TerraFrontend`) |

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
