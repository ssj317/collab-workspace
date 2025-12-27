#  Real-Time Collaborative Workspace Backend


##  Overview

This project implements a scalable backend system that supports:

- Secure authentication & role-based access control
- Project and workspace management
- Real-time collaboration using WebSockets
- Asynchronous job processing
- Multi-database architecture
- Cloud-ready deployment using Docker and Vercel

The system is designed following **API-first**, **clean architecture**, and **production-grade** backend principles.

---

##  Architecture Overview

### High-Level Design

- **Stateless REST APIs** handle authentication, projects, and job submissions
- **Stateful services** (databases, WebSockets, workers) are externalized
- **Redis** is used for caching, queues, and pub/sub
- **MongoDB** stores logs and observability data
- **PostgreSQL** stores transactional data
- **Socket.IO** enables real-time collaboration
- **Background workers** process async jobs

---

##  Tech Stack

| Layer | Technology |
|-----|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Authentication | JWT |
| Relational DB | PostgreSQL |
| Cache / Queue | Redis |
| Logs / Observability | MongoDB |
| Real-Time | Socket.IO + Redis Pub/Sub |
| Jobs | Worker + Queue |
| Containerization | Docker, Docker Compose |
| Serverless Deployment | Vercel |

---

##  Authentication & Authorization

- JWT-based authentication
- Role-Based Access Control (RBAC)
  - **Owner**
  - **Collaborator**
  - **Viewer**
- Authorization enforced via middleware
- Input validation and secure headers applied

---

## Project Structure

collab-backend/
├── api/                 # Vercel serverless entry
│   └── index.js
├── src/
│   ├── app.js           # Express app
│   ├── server.js        # HTTP + WebSocket server
│   ├── config/          # DB & env configs
│   ├── modules/
│   │   ├── auth/
│   │   ├── projects/
│   │   └── jobs/
│   ├── socket/          # Socket.IO logic
│   ├── workers/         # Background job worker
│   └── middlewares/
├── docker-compose.yml
├── Dockerfile
├── vercel.json
├── .dockerignore
├── .env.example
└── README.md



## Environment Variables

PORT=5000

PostgreSQL
-PG_HOST=localhost
-PG_PORT=5432
-PG_USER=postgres
-PG_PASSWORD=your_password
-PG_DATABASE=collab_workspace

Redis
-REDIS_HOST=localhost
-REDIS_PORT=6379

MongoDB
-MONGO_URI=mongodb://localhost:27017/collab_logs
-MONGO_DB=collab_logs

JWT
-JWT_SECRET=your_secret_key
-JWT_EXPIRES_IN=15m

---


Running Locally (Without Docker)
Prerequisites

Node.js 18+

PostgreSQL

Redis

MongoDB

Steps
npm install
npm run dev


Server will start at:

http://localhost:5000

---

## Running with Docker (Recommended)
-Prerequisites

-Docker

-Docker Compose

-Start all services
-docker-compose up --build

## This will start:

-API server

-PostgreSQL

-Redis

-MongoDB

-Background worker

-WebSocket server


---

## Real-Time Collaboration (WebSockets)

-Implemented using Socket.IO

Supported events:

-user-joined

-user-left

-file-change (mocked)

-cursor-update

-Redis Pub/Sub enables horizontal scaling

-WebSocket functionality is demonstrated in Docker-based deployments.
---

 ## Asynchronous Job Processing

-Jobs accepted via REST API

-Pushed to Redis queue

-Processed by background workers

-Job status persisted

-Supports retries and failure handling
---

## Logging & Observability

-MongoDB stores:

-Authentication logs

-Project actions

-Job lifecycle events

-Enables high-volume writes and flexible querying

---

## Vercel Limitations 

-Due to the serverless nature of Vercel:

-Persistent WebSocket connections are not supported

-Background workers and long-running processes cannot run continuously

-Stateful services (Redis, MongoDB, PostgreSQL, WebSockets) are not deployed on Vercel

-To address this:

-REST APIs are deployed on Vercel

-Real-time collaboration, background jobs, and databases are demonstrated via Docker-based deployments

-This hybrid approach balances serverless scalability with stateful backend requirements.


