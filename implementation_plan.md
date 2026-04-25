# 🎓 Mülakat Hazırlık Planı — Full-Stack Todo App

## Proje Özeti

Gerçek bir production-ready **Todo List** uygulaması inşa edeceğiz. Bu süreçte her teknoloji, gerçek bir problemi çözmek için kullanılacak.

```
[React Frontend] → [C# API] → [PostgreSQL]
       ↑                ↑
   [Docker]         [Docker]
       ↓
  [AWS (ECS/EC2)]
       ↑
  [Terraform]
       ↑
   [GitHub Actions CI/CD]
```

---

## 📍 PHASE 1 — Temeller (1-2 Gün)

### Adım 1: GitHub — Repository & Branching
> **Ne öğrenirsin:** Git workflow, branch stratejisi, commit convention, .gitignore

- [x] GitHub'da yeni repo oluşturma
- [x] `main`, `develop`, `feature/*` branch stratejisi
- [x] `.gitignore` dosyası (C#, Node, Terraform için)
- [x] İlk commit ve push
- [x] README.md yazma

**Senden beklenen:** GitHub hesabın varsa repo oluşturup link paylaşman.

---

## 📍 PHASE 2 — Backend (2-3 Gün)

### Adım 2: C# Web API
> **Ne öğrenirsin:** REST API, CRUD, Repository Pattern, Dependency Injection

Teknolojiler:
- .NET 8 Web API
- Entity Framework Core
- PostgreSQL bağlantısı

Endpointler:
```
GET    /api/todos        → Tüm todo'ları getir
GET    /api/todos/{id}   → Tek todo getir
POST   /api/todos        → Yeni todo ekle
PUT    /api/todos/{id}   → Todo güncelle
DELETE /api/todos/{id}   → Todo sil
```

- [x] `dotnet new webapi` ile proje oluşturma
- [x] Todo model tanımlama
- [x] DbContext ve PostgreSQL bağlantısı
- [x] Repository Pattern implementasyonu
- [x] Controller yazma
- [x] Swagger ile test etme

---

## 📍 PHASE 3 — Veritabanı (1 Gün)

### Adım 3: PostgreSQL
> **Ne öğrenirsin:** İlişkisel DB, migration, connection string, EF Core

- [x] PostgreSQL kurulumu (Docker ile)
- [x] Veritabanı ve tablo tasarımı
- [x] EF Core Migration'ları
- [x] Seed data ekleme

---

## 📍 PHASE 4 — Docker (1-2 Gün)

### Adım 4: Docker & Docker Compose
> **Ne öğrenirsin:** Container kavramı, Dockerfile, multi-container app, networking

- [ ] API için `Dockerfile` yazma
- [ ] React için `Dockerfile` yazma  
- [ ] `docker-compose.yml` ile tüm servisleri birleştirme
  - API container
  - PostgreSQL container
  - React container
- [ ] Environment variable yönetimi
- [ ] `docker compose up` ile tek komutla çalıştırma

---

## 📍 PHASE 5 — Frontend (2-3 Gün)

### Adım 5: React
> **Ne öğrenirsin:** Component, Hook, State Management, API çağrıları, Modern UI

Teknolojiler:
- React 18 + Vite
- Axios (API calls)
- React Query (server state)

Özellikler:
- [ ] Todo listesi görüntüleme
- [ ] Todo ekleme formu
- [ ] Todo tamamlama (checkbox)
- [ ] Todo silme
- [ ] Filtreleme (All / Active / Completed)
- [ ] Loading & Error state'leri
- [ ] Responsive tasarım

---

## 📍 PHASE 6 — AWS & Terraform (2-3 Gün)

### Adım 6: Terraform ile AWS Infrastructure
> **Ne öğrenirsin:** Infrastructure as Code, AWS servisleri, state management

AWS Servisleri:
- **VPC** — Ağ altyapısı
- **ECR** — Docker image registry
- **ECS Fargate** — Container çalıştırma (serverless)
- **RDS** — PostgreSQL managed database
- **ALB** — Load Balancer (yük dengeleme)
- **Route53** — DNS (opsiyonel)

Terraform Dosyaları:
```
terraform/
├── main.tf          → Provider tanımı
├── variables.tf     → Değişkenler
├── outputs.tf       → Çıktılar
├── vpc.tf           → Network
├── ecs.tf           → Container servisi
├── rds.tf           → Veritabanı
└── ecr.tf           → Image registry
```

- [ ] AWS hesabı ve IAM kullanıcı kurulumu
- [ ] Terraform kurulumu
- [ ] `terraform init` / `plan` / `apply`
- [ ] Infrastructure deploy etme
- [ ] `terraform destroy` ile temizleme

**Senden beklenen:** AWS hesabı açılması ve IAM kullanıcı oluşturması.

---

## 📍 PHASE 7 — CI/CD (1-2 Gün)

### Adım 7: GitHub Actions
> **Ne öğrenirsin:** Pipeline, otomatik test/build/deploy, secrets yönetimi

```yaml
# Her push'ta otomatik olarak:
1. Build & Test (C# + React)
2. Docker image oluştur
3. ECR'a push et
4. ECS'i güncelle (deploy)
```

- [ ] `.github/workflows/` klasörü oluşturma
- [ ] Build pipeline yazma
- [ ] Test pipeline yazma
- [ ] Deploy pipeline yazma
- [ ] GitHub Secrets ile AWS credential yönetimi

---

## 🗓️ Toplam Süre Tahmini

| Phase | Konu | Süre |
|-------|------|------|
| 1 | GitHub | 1 gün |
| 2 | C# Web API | 2-3 gün |
| 3 | PostgreSQL | 1 gün |
| 4 | Docker | 1-2 gün |
| 5 | React | 2-3 gün |
| 6 | Terraform + AWS | 2-3 gün |
| 7 | GitHub Actions CI/CD | 1-2 gün |
| **TOPLAM** | | **~10-14 gün** |

---

## 🎯 Mülakat Odak Noktaları

Her adımda sana şu tür mülakat soruları da soracağım:

- *"Docker ile VM arasındaki fark nedir?"*
- *"Repository pattern neden kullanırsın?"*
- *"Terraform state nedir, neden önemlidir?"*
- *"REST API ile GraphQL farkı nedir?"*
- *"CI/CD pipeline nedir, avantajları nelerdir?"*

---

## ✅ Başlangıç Noktası

**PHASE 1: GitHub** ile başlıyoruz.

➡️ Senden beklenen ilk şey: GitHub hesabın var mı? Varsa hazırız, başlayalım!
