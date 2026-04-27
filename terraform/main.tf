terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Not: Öğrenme aşamasında state dosyasını lokalde tutuyoruz.
  # Gerçek projelerde burası S3 bucket olarak ayarlanır.
  backend "local" {
    path = "terraform.tfstate"
  }
}

provider "aws" {
  region = var.aws_region
}
