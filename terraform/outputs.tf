output "instance_public_ip" {
  description = "EC2 Sunucusunun IP adresi"
  value       = aws_instance.app_server.public_ip
}
