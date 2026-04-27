# Design Spec: CI/CD Pipeline with AWS ECR & SSM

**Date:** 2026-04-27
**Status:** Approved
**Topic:** Automating deployment to AWS EC2 using GitHub Actions, ECR, and SSM.

## 1. Overview
Implement a robust Continuous Deployment (CD) pipeline that automates the build, push, and deployment phases. The system will prioritize security by using AWS Systems Manager (SSM) for command execution, avoiding the need for open SSH ports.

## 2. Infrastructure Changes (Terraform)

### 2.1 IAM Roles
- **EC2 Instance Role:** Create an IAM role with the following policies:
    - `AmazonSSMManagedInstanceCore`: Enables SSM communication.
    - `AmazonEC2ContainerRegistryReadOnly`: Allows pulling images from ECR.
- **Instance Profile:** An IAM instance profile to associate the role with the EC2 instance.

### 2.2 Security Groups
- Verify that egress allows HTTPS (443) for SSM and ECR communication.

## 3. GitHub Actions Pipeline

### 3.1 Jobs Structure
1.  **Build & Test:** Existing CI logic for .NET and React.
2.  **Push to ECR:**
    - Login to AWS ECR.
    - Build Docker images with `latest` and `SHA` tags.
    - Push images to `${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/terra-api` and `terra-web`.
3.  **Deploy via SSM:**
    - Prepare `.env` file content using GitHub Secrets.
    - Use `aws-actions/aws-ssm-send-command` to execute deployment script on the EC2 instance.

### 3.2 Deployment Script (Remote Execution)
```bash
# Login to ECR
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

# Update application directory
cd /home/ubuntu/app

# Create/Update .env file
cat <<EOF > .env
${ENV_CONTENT}
EOF

# Pull and restart containers
docker-compose pull
docker-compose up -d --remove-orphans
```

## 4. Configuration & Secrets

### 4.1 GitHub Secrets
| Secret Name | Description |
|-------------|-------------|
| `AWS_ACCESS_KEY_ID` | IAM User credentials for GitHub Actions |
| `AWS_SECRET_ACCESS_KEY` | IAM User credentials for GitHub Actions |
| `AWS_REGION` | e.g., `eu-central-1` |
| `EC2_INSTANCE_ID` | Target EC2 ID |
| `POSTGRES_USER/PASSWORD` | Database credentials |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `JWT_KEY` | Secret key for JWT signing |

## 5. Success Criteria
- [ ] Code pushed to `main` is automatically built and pushed to ECR.
- [ ] EC2 instance successfully pulls new images and restarts containers without manual intervention.
- [ ] No public SSH access is required for deployment.
- [ ] Sensitive data is managed securely via GitHub Secrets.

## 6. Implementation Notes
- Ensure `docker-compose.yml` uses the ECR image paths for production or can be overridden via environment variables.
- The EC2 instance must have the SSM agent installed (standard on Ubuntu 22.04 AMIs).
