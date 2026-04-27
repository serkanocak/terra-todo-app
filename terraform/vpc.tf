module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "${var.project_name}-vpc"
  cidr = "10.0.0.0/16"

  # AWS Frankfurt (eu-central-1) bölgesindeki 3 farklı veri merkezini kullanıyoruz (Yüksek bulunabilirlik için)
  azs                          = ["eu-central-1a", "eu-central-1b", "eu-central-1c"]
  private_subnets              = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets               = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  database_subnets             = ["10.0.201.0/24", "10.0.202.0/24", "10.0.203.0/24"]
  create_database_subnet_group = true

  # ÜCRETSİZ KATMAN (Free Tier) NOTU: 
  # NAT Gateway ÜCRETLİDİR (saatlik ~$0.045). 
  # Tamamen ücretsiz kalmak için NAT Gateway'i kapatıyoruz.
  enable_nat_gateway = false
  single_nat_gateway = false

  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}
