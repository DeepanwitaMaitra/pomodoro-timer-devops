# DevOps Interview Notes

## 60-second answer

I built a lightweight Pomodoro timer using HTML, CSS and JavaScript and then applied a basic DevOps workflow around it. The application is packaged using Docker and served through Nginx. The source code is maintained in GitHub, and GitHub Actions provides CI automation. On every push or pull request to the main branch, the workflow validates the expected files, builds the Docker image, runs a temporary container and performs an HTTP health check. This demonstrates version control, containerization, CI automation and basic deployment validation.

## Core concepts

### What is CI?

Continuous Integration means frequently integrating code changes and automatically running validation/build steps so problems can be detected early.

### What does the pipeline do?

```text
git push
   |
   v
GitHub Actions
   |
   +--> checkout
   +--> validate files
   +--> docker build
   +--> docker run
   +--> curl /health
```

### Image vs container

A Docker image is a packaged, immutable template. A container is a running instance created from that image.

### Why Docker?

It makes the runtime environment reproducible and avoids requiring developers to manually install Nginx and configure the application environment.

### Why Nginx?

The project is a static frontend, so Nginx is a lightweight HTTP server suitable for serving it.

### What is Docker Compose?

Compose describes how to run the application's container locally using a YAML configuration. It makes local startup repeatable.

### Why is the health endpoint useful?

A Docker build can succeed while the application fails at runtime. The health endpoint gives the CI job a simple runtime check.

### What is a GitHub Actions workflow?

A YAML-defined automation that GitHub runs in response to events such as pushes and pull requests.

### Why use pull requests?

They allow the same CI checks to run before changes are merged into the main branch.

### What happens if the Docker build fails?

The GitHub Actions job fails, which makes the problem visible instead of allowing an invalid image to pass the CI workflow.

## Troubleshooting questions

### Container exits immediately

Check:

```bash
docker ps -a
docker logs <container>
```

### Port already in use

Check:

```bash
docker ps
```

Then stop the conflicting container or choose another host port.

### Health check fails

Check:

```bash
docker logs <container>
curl http://localhost:8080/health
```

Then verify that the container is running and port 8080 is mapped to container port 80.

## Security questions

Do not put passwords or API keys in the repository. Use environment variables or a proper secrets manager when secrets are required.

## Honest scope

This project implements CI, not full production CD. It does not currently deploy to AWS, Kubernetes or ECR. If those are added later, the README should be updated only after they are actually implemented.

## Future architecture

```text
Developer
   |
 GitHub
   |
GitHub Actions
   |
 Docker Build
   |
  ECR
   |
 ECS/Fargate
   |
 ALB
   |
 Users
```
