# CI/CD Pipeline with AWS ECR & SSM Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Automate the deployment of the Terra Todo App to AWS EC2 using GitHub Actions, AWS ECR for image storage, and AWS SSM for secure remote execution.

**Architecture:** The pipeline will build Docker images, push them to ECR, and then trigger a deployment on EC2 via SSM. EC2 will have an IAM role to allow SSM communication and ECR access, ensuring no open SSH ports are needed.

**Tech Stack:** GitHub Actions, AWS CLI, Docker, Terraform, AWS ECR, AWS SSM.

---

### Task 1: IAM Role and Instance Profile (Terraform)

**Files:**
- Modify: `terraform/ec2_instance.tf`

- [ ] **Step 1: Define IAM Role and Policies**
Add the IAM role with necessary managed policies to `terraform/ec2_instance.tf`.

```hcl
resource "aws_iam_role" "ec2_role" {
  name = "${var.project_name}-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ssm_policy" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_role_policy_attachment" "ecr_policy" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "${var.project_name}-ec2-profile"
  role = aws_iam_role.ec2_role.name
}
```

- [ ] **Step 2: Attach Instance Profile to EC2**
Update the `aws_instance.app_server` resource to use the new instance profile.

```hcl
resource "aws_instance" "app_server" {
  # ... existing config
  iam_instance_profile = aws_iam_instance_profile.ec2_profile.name
  # ... rest of config
}
```

- [ ] **Step 3: Commit**

```bash
git add terraform/ec2_instance.tf
git commit -m "infra: add IAM role and instance profile for SSM and ECR"
```

---

### Task 2: GitHub Actions - Build and Push to ECR

**Files:**
- Modify: `.github/workflows/ci.yml` (Rename to `deploy.yml` or keep `ci.yml`)

- [ ] **Step 1: Add AWS ECR Push Job**
Update the workflow to include AWS authentication and Docker push to ECR.

```yaml
  push-to-ecr:
    name: Build & Push to ECR
    needs: [backend-check, frontend-check, docker-check]
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build and Push API Image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: terra-api
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG -t $ECR_REGISTRY/$ECR_REPOSITORY:latest src/api/
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest

      - name: Build and Push Web Image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: terra-web
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG -t $ECR_REGISTRY/$ECR_REPOSITORY:latest src/web/
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add ECR push job to workflow"
```

---

### Task 3: GitHub Actions - Deployment via SSM

**Files:**
- Modify: `.github/workflows/ci.yml`

- [ ] **Step 1: Add Deployment Job**
Add the `deploy` job using AWS SSM to trigger the remote script.

```yaml
  deploy:
    name: Deploy to EC2 via SSM
    needs: push-to-ecr
    runs-on: ubuntu-latest
    steps:
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Deploy via SSM
        uses: aws-actions/aws-ssm-send-command@v2
        with:
          instance-ids: ${{ secrets.EC2_INSTANCE_ID }}
          command: |
            aws ecr get-login-password --region ${{ secrets.AWS_REGION }} | docker login --username AWS --password-stdin ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com
            cd /home/ubuntu/app
            cat <<EOF > .env
            POSTGRES_DB=${{ secrets.POSTGRES_DB }}
            POSTGRES_USER=${{ secrets.POSTGRES_USER }}
            POSTGRES_PASSWORD=${{ secrets.POSTGRES_PASSWORD }}
            VITE_GOOGLE_CLIENT_ID=${{ secrets.VITE_GOOGLE_CLIENT_ID }}
            Jwt__Key=${{ secrets.JWT_KEY }}
            Jwt__Issuer=${{ secrets.JWT_ISSUER }}
            Jwt__Audience=${{ secrets.JWT_AUDIENCE }}
            EOF
            docker-compose pull
            docker-compose up -d --remove-orphans
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add SSM deployment job to workflow"
```

---

### Task 4: Final Verification and README Update

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Document CI/CD Secrets in README**
Add a section to `README.md` about the required GitHub Secrets.

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: document required CI/CD secrets"
```

- [ ] **Step 3: Final Verification**
Push to `develop` or `main` and verify the GitHub Actions run.
Expected: All jobs green, EC2 updated.
