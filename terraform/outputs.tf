output "alb_dns_name" {
  description = "Application Load Balancer'ın DNS adresi (Uygulamaya buradan erişilecek)"
  value       = aws_lb.main.dns_name
}

output "ecr_repository_url_api" {
  description = "API ECR repository URL"
  value       = aws_ecr_repository.api.repository_url
}

output "ecr_repository_url_web" {
  description = "Web ECR repository URL"
  value       = aws_ecr_repository.web.repository_url
}

output "rds_endpoint" {
  description = "RDS PostgreSQL endpoint"
  value       = module.db.db_instance_address
}
