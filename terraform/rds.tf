module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "6.0.0"

  identifier = "${var.project_name}-db"

  engine               = "postgres"
  engine_version       = "16.6"
  family               = "postgres16" # DB parameter group
  major_engine_version = "16"         # DB option group
  instance_class       = "db.t3.micro" # Free Tier uyumlu tip

  allocated_storage     = 20
  max_allocated_storage = 100

  db_name  = var.db_name
  username = "postgres"
  password = var.db_password
  port     = 5432

  # Subnet ve Security Group ayarları
  db_subnet_group_name   = module.vpc.database_subnet_group_name
  vpc_security_group_ids = [aws_security_group.rds.id]

  # Öğrenme aşamasında maliyeti düşürmek ve silmeyi kolaylaştırmak için:
  skip_final_snapshot = true
  deletion_protection = false

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}
