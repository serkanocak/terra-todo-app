variable "aws_region" {
  description = "AWS bölgesi"
  type        = string
  default     = "eu-central-1" # Frankfurt (Türkiye'ye en yakın ve popüler bölge)
}

variable "project_name" {
  description = "Projenin adı"
  type        = string
  default     = "terra-todo"
}

variable "environment" {
  description = "Ortam adı (dev, prod vb.)"
  type        = string
  default     = "dev"
}

variable "db_password" {
  description = "RDS PostgreSQL şifresi"
  type        = string
  sensitive   = true
  default     = "TerraTodo123!" # Gerçek projelerde burası boş bırakılıp secret manager'dan alınır.
}

variable "db_name" {
  description = "Veritabanı adı"
  type        = string
  default     = "terratodo"
}
