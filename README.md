# Pomodoro Timer — DevOps Project

A containerized Pomodoro productivity application with a lightweight CI pipeline using GitHub Actions.

## Project goal

The application is a simple Pomodoro timer. The DevOps part of the project demonstrates how application code can be version-controlled, containerized, automatically built and tested in CI.

## Architecture

```text
Developer
   |
   v
Git / GitHub
   |
   v
GitHub Actions
   |
   +--> Validate files
   |
   +--> Build Docker image
   |
   +--> Run container
   |
   +--> HTTP health check
   |
   v
Docker Container
   |
   v
Nginx
   |
   v
HTML/CSS/JavaScript application
```

## Technology stack

- HTML5
- CSS3
- Vanilla JavaScript
- Nginx
- Docker
- Docker Compose
- Git/GitHub
- GitHub Actions
- Linux

## Run with Docker

Build:

```bash
docker build -t pomodoro-timer -f docker/Dockerfile .
```

Run:

```bash
docker run -d --name pomodoro -p 8080:80 pomodoro-timer
```

Open:

http://localhost:8080

Health check:

http://localhost:8080/health

Stop:

```bash
docker rm -f pomodoro
```

## Run with Docker Compose

```bash
docker compose up --build
```

Open:

http://localhost:8080

Stop:

```bash
docker compose down
```

## CI/CD

The repository contains:

`.github/workflows/ci.yml`

On pushes and pull requests to `main`, GitHub Actions:

1. Checks out the repository.
2. Validates required files.
3. Builds the Docker image.
4. Starts a container.
5. Performs an HTTP health check.
6. Stops the test container.

This is a CI pipeline. It is intentionally not described as production deployment because this repository does not automatically deploy to a cloud environment.

## DevOps concepts demonstrated

- Version control
- CI automation
- Containerization
- Immutable Docker image build
- Basic application health checking
- Reproducible local deployment
- Linux/Docker command-line workflow

## Interview explanation

I built a small Pomodoro application and added a DevOps workflow around it. The source code is maintained in Git, the application is packaged into an Nginx-based Docker image, and GitHub Actions automatically builds and tests the image whenever changes are pushed or a pull request is opened.

The pipeline validates the repository, creates the Docker image, runs it in a temporary container, and calls a health endpoint to verify that the container is serving traffic.

## Why Docker?

Docker packages the static web application together with the Nginx runtime configuration, making the application environment reproducible.

## Why Nginx?

Nginx is lightweight and well suited to serving static HTML, CSS and JavaScript files.

## Why GitHub Actions?

It provides repository-integrated CI automation. A developer does not have to manually perform the same validation and Docker build steps after every change.

## Why a health check?

A successful Docker build only proves that an image can be created. The health check verifies that a running container actually responds to HTTP traffic.

## Current limitations

This project has CI but not automatic production deployment. It does not claim Kubernetes, ECS, ECR, Terraform or a production cloud deployment.

Possible next stage:

```text
GitHub Actions
    |
    v
Docker image
    |
    v
Amazon ECR
    |
    v
ECS/Fargate
    |
    v
Application Load Balancer
```
