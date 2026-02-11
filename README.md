

# Travel Activity Ranking Application

## Overview

This application ranks how suitable a city is for specific travel
activities over the next 7 days, using forecast data from Open-Meteo.

Activities ranked:

-   Skiing\
-   Surfing\
-   Outdoor sightseeing\
-   Indoor sightseeing

The primary goal of this implementation was to design a clean,
extensible, and production-ready architecture rather than maximize
feature breadth within the 2--3 hour constraint.

The system demonstrates:

-   Clean separation of concerns\
-   Domain-driven structuring\
-   Extensibility through composable scoring strategies\
-   Strong TypeScript discipline\
-   Cloud-ready architectural foundations

------------------------------------------------------------------------

# Architectural Approach

This solution was intentionally structured using layered architecture to
reflect production-grade system design patterns.

## Backend (Node.js + TypeScript + GraphQL)

The backend is divided into clearly defined layers:

### 1. Domain Layer

Contains pure business logic:

-   `ActivityScorer` interface\
-   Individual scorer implementations\
-   Core domain models (`DailyForecast`, `ActivityScore`)

Each activity implements:

``` ts
interface ActivityScorer {
  score(forecast: DailyForecast[]): ActivityScore;
}
```

All scorers compute a normalized percentage score:

``` ts
const score = Math.round((goodDays / forecast.length) * 100);
```

This ensures determinism, scalability, and explainability.

------------------------------------------------------------------------

### 2. Infrastructure Layer

`WeatherService` integrates with Open-Meteo and maps external API
responses into internal domain models.

External API formats are intentionally not exposed beyond this boundary
to prevent infrastructure concerns from leaking into the domain.

------------------------------------------------------------------------

### 3. Application Layer

`ActivityRankingFacade` orchestrates:

-   Weather retrieval\
-   Activity scoring\
-   Result aggregation

GraphQL resolvers delegate to this layer and contain no business logic,
keeping the transport thin and testable.

------------------------------------------------------------------------

### 4. Transport Layer

GraphQL (Apollo Server) exposes:

``` graphql
rankActivities(city: String!): [ActivityRanking!]!
```

GraphQL was selected because:

-   It aligns with the stated stack\
-   It enables future schema expansion\
-   It supports client-driven data shaping\
-   It scales well for evolving product features

------------------------------------------------------------------------

# Frontend Architecture (React + TypeScript)

The frontend follows a feature-based structure:

    src/
      api/
      features/activityRanking/

Responsibilities:

-   `graphqlClient.ts` → Transport abstraction\
-   `useActivityRanking.ts` → State management and orchestration\
-   `ActivityRankingPage.tsx` → Presentation only

This structure allows:

-   Clean UI/data separation\
-   Reusable hooks\
-   Easy testing\
-   Feature modularity

------------------------------------------------------------------------

# Production & Cloud Considerations (AWS / Kubernetes)

If productionized within an AWS environment:

## Deployment Model

-   Containerized Node.js backend\
-   Deployed to EKS (Kubernetes)\
-   Horizontal Pod Autoscaling based on CPU/memory\
-   Frontend deployed via S3 + CloudFront or containerized via EKS

## Observability

-   Structured logging\
-   Metrics collection (DataDog / CloudWatch)\
-   Health checks for readiness and liveness probes

## Resilience

-   Retry with exponential backoff for external API calls\
-   Circuit breaker pattern for the weather service\
-   Response caching (Redis or in-memory)

## CI/CD

-   GitHub Actions pipeline\
-   Automated linting and type checking\
-   Unit and integration test execution\
-   Docker build and push\
-   Helm-based deployment to Kubernetes

The current architecture supports these evolutions without major
refactoring.

------------------------------------------------------------------------

# Leadership & Design Considerations

This implementation prioritizes:

-   Extensibility over hardcoded logic\
-   Testability through clear boundaries\
-   Explicit dependency flow\
-   Minimal coupling between layers

Each layer has a single responsibility. The implementation reflects how
I would guide a squad to build a small service that can evolve safely
within a larger distributed system.

------------------------------------------------------------------------

# Trade-offs & Omissions

Given the 2--3 hour time constraint, the following were intentionally
omitted:

-   Automated unit tests\
-   Caching layer\
-   Dependency injection container\
-   Environment-based configuration\
-   Retry/backoff handling\
-   Containerization scripts\
-   Infrastructure-as-code (Terraform)

These were consciously deprioritized in favor of structural clarity and
architectural soundness.

------------------------------------------------------------------------

# ScreenShots
<img width="1913" height="906" alt="image" src="https://github.com/user-attachments/assets/114a5b24-17c2-4b89-bf0e-d77608406b95" />
<img width="1916" height="859" alt="image" src="https://github.com/user-attachments/assets/52dd00ea-7993-4e8b-9980-6c586f571411" />

# AI Usage

AI tools were used as a productivity assistant to:

-   Refine TypeScript typing\
-   Validate architectural boundaries\
-   Review and improve clarity of implementation\
-   Sanity-check scoring consistency

AI was used to accelerate iteration and review clarity, but all
architectural boundaries, trade-offs, and production considerations were
deliberately designed and validated manually.

------------------------------------------------------------------------

# How To Run

## Backend

``` bash
cd backend
npm install
npm run dev
```

Runs at: http://localhost:4000

------------------------------------------------------------------------

## Frontend

``` bash
cd frontend
npm install
npm run dev
```

Runs at: http://localhost:5173

------------------------------------------------------------------------

# Final Notes

This solution emphasizes:

-   Clean architectural layering\
-   Clear domain modeling\
-   Pragmatic engineering trade-offs\
-   Cloud-native readiness\
-   Extensible design patterns

The intent was to demonstrate how I would structure a maintainable,
observable, and production-ready service within a cross-functional
engineering squad.
