# 📋 Terra Todo App — Task List

> **Proje:** Full-stack Todo App (React + C# .NET 8 + PostgreSQL + Docker + AWS + Terraform + CI/CD)
> **Amaç:** Mülakat hazırlık projesi — modern DevOps pratiklerini öğrenmek

---

## 🔴 FAZ 1 — Local Development (Backend + Frontend + Docker)

### 1.1 🗂️ Proje İskeleti & Yapılandırma
- [x] Git repo başlatıldı (`.git` mevcut)
- [x] `.gitignore` oluşturuldu
- [x] `README.md` oluşturuldu
- [x] `docker-compose.yml` oluşturuldu (PostgreSQL + Adminer)

### 1.2 ⚙️ Backend — C# .NET 8 Web API (`src/api/`)
- [x] `dotnet new webapi` ile proje oluşturulacak
- [x] `TodoItem` Entity modeli oluşturulacak
- [x] `AppDbContext` (Entity Framework Core + PostgreSQL) yapılandırıldı
- [x] CRUD endpointleri yazılacak:
  - [x] `GET /api/todos` — tüm todo'ları listele
  - [x] `POST /api/todos` — yeni todo oluştur
  - [x] `PUT /api/todos/{id}` — todo güncelle
  - [x] `DELETE /api/todos/{id}` — todo sil
  - [x] `PATCH /api/todos/{id}/toggle` — tamamlandı/bekliyor toggle
- [x] Swagger / OpenAPI yapılandırıldı
- [x] CORS yapılandırıldı (React frontend için)
- [x] `appsettings.json` → DB connection string (Docker env var destekli)
- [x] `Dockerfile` oluşturulacak (`src/api/Dockerfile`)

### 1.3 🎨 Frontend — React 18 + Vite (`src/web/`)
- [x] `npm create vite@latest` ile proje oluşturulacak
- [ ] API client (fetch / axios) yapılandırılacak
- [ ] Bileşenler:
  - [ ] `TodoList` — todo listesi
  - [ ] `TodoItem` — tekil todo kartı (checkbox, edit, delete)
  - [ ] `AddTodoForm` — yeni todo ekleme formu
  - [ ] `Header` — uygulama başlığı
- [ ] State yönetimi (React hooks: `useState`, `useEffect`)
- [ ] API entegrasyonu tamamlanacak (backend ile bağlantı)
- [ ] Temel CSS styling (modern, temiz tasarım)
- [ ] `Dockerfile` oluşturulacak (`src/web/Dockerfile`)

### 1.4 🐳 Docker & Docker Compose
- [x] `src/api/Dockerfile` yazılacak (multi-stage build)
- [x] `src/web/Dockerfile` yazılacak (multi-stage build)
- [x] `docker-compose.yml` yazılacak:
  - [x] `api` servisi
  - [x] `web` servisi
  - [x] `db` servisi (PostgreSQL)
  - [x] Network ve volume tanımları
- [x] `docker compose up` ile tüm stack ayağa kalkacak
- [/] Lokal test:
  - [x] Frontend: http://localhost:5173
  - [x] API: http://localhost:5000
  - [x] Swagger: http://localhost:5000/swagger

---

## 🟡 FAZ 2 — CI/CD Pipeline (GitHub Actions)

### 2.1 🔄 CI Pipeline
- [x] `.github/workflows/ci.yml` oluşturulacak
- [x] Backend build & test job
- [x] Frontend build job
- [x] Docker image build kontrolü (Dockerfiles validation)
- [ ] Docker image push (Docker Hub veya GHCR) - (CD aşamasında yapılacak)

### 2.2 🚀 CD Pipeline
- [ ] `.github/workflows/cd.yml` oluşturulacak
- [ ] AWS credentials yapılandırması (GitHub Secrets)
- [ ] ECS deploy job

---

## 🔵 FAZ 3 — AWS Infrastructure (Terraform)

### 3.1 🏗️ Terraform Yapılandırması (`terraform/`)
- [ ] `main.tf` — provider ve genel yapılandırma
- [ ] `variables.tf` — değişkenler
- [ ] `outputs.tf` — çıktılar
- [ ] `vpc.tf` — VPC, subnet, security group
- [ ] `ecs.tf` — ECS Cluster, Task Definition, Service (Fargate)
- [ ] `rds.tf` — PostgreSQL RDS instance
- [ ] `ecr.tf` — Elastic Container Registry

### 3.2 ✅ AWS Deploy
- [ ] `terraform init`
- [ ] `terraform plan`
- [ ] `terraform apply`
- [ ] Uygulama AWS'de canlıya alınacak

---

## 📊 İlerleme Özeti

| Faz | Durum | Tamamlanma |
|-----|-------|------------|
| Faz 1 — Local Dev | 🔴 Devam Ediyor | 3 / 28 |
| Faz 2 — CI/CD | ⏳ Bekliyor | 0 / 7 |
| Faz 3 — AWS/Terraform | ⏳ Bekliyor | 0 / 11 |

---

> **Şu anki adım:** `1.2 — Backend C# .NET 8 Web API` kurulumu
