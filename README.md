# INFS605-Assignment2-Starter-Files
This is a starter application for a BCIS second-year INFS605 Microservices programming assignment. It includes a containerized student-profile service (Python + Flask), a PostgreSQL database, a React (Vite) admin UI to list/search/add/delete students and record attendance and docker-compose.yml. Students are invited to extend the system by adding their own microservices and deploying a small-scale distributed application.

## License

Code in this repository is licensed under the [MIT License](LICENSE).

Assignment instructions, diagrams, and documentation (non-code) are licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

## Microservices Assignment Starter

This repository provides a starter  application for your programming assignment in the INFS605 Microservices course (BCIS Year 2).

You are provided with:
- A `student-profile` microservice built in Flask
- A PostgreSQL container for persistence
- A shared `docker-compose.yml` to deploy services
- a React (Vite) Admin user UI

microservices-assignment/
├── docker-compose.yml
├── README.md
├── admin-frontend/
│   ├── Public/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── vite-config.js
├── student-profile/
│   ├── app.py
│   ├── Dockerfile
│   ├── init.sql
│   └── requirements.txt
├── .env.example
├── .gitignore
├── docker-compose.yml
├── LICENSE
└── README.md

Technologies used:
- Python + Flask
- Docker + Docker Compose
- PostgreSQL
- React

Your task is to build additional microservices, connect them using Docker Compose, and demonstrate a small, functional microservices architecture with clear service boundaries.

Start small, and iterate!

You can use this as a starting point for your assignment and consider adding further services – a Course Catalog Service, a Feedback Service, a Notification Service, a Grades Service (that can store and retrieve grades for students and courses), a Timetable Service (that can show weekly schedules for students or lecturers) an Assignment Tracker (shows coming and submitted assignments), a Room Booking Service (for team meetings), or come more generic services such as – an Image Upload Service, a Search Service, a Logging or Audit Trail Service, Frontend UI, PDF Generator, System Metrics Service.

## Getting Started

### 1. Prerequisites
- Docker
- Docker-Compose 
- Python (if running services outside of Docker)
[If on Ubuntu: sudo apt install docker-compose]
[If on Ubuntu: sudo snap install docker]

### 2. Building and running the System
```bash
docker-compose up -d --build
```

- API: http://localhost:5001
- Frontend: http://localhost:3000

### 3. Running the System on VirtualBox

If you are using VirtualBox to host your application on Ubuntu you will need to set up Port Forwarding Rules to allow your services to run on Localhost port 5001. In Machine/Settings (and in Expert mode) under Network set a new protocol with TCP Host Port 5001 and Guest Port 5001. That will map port 5001 in the student-services container to port 5001 of your browser for the API. Then set another new protocol with TCP Host Port 3000 and Guest Port 3000. That will map port 3000 in the admin-frontend container to port 3000 of your browser. 

### 4. API Endpoints

#### Student Profile Service (http://localhost:5001)
- `GET /students` – list all students
- `GET /students/:id` – get a student
- `POST /students` – `{ name, email }`
- `PUT /students/:id` – update `{ name?, email? }`
- `DELETE /students/:id`
- `POST /students/:id/attendance` – `{ date: 'YYYY-MM-DD', status: 'Present|Absent|Late|Excused' }`

## Environment Variables

- DB URL is passed via `DATABASE_URL` inside docker-compose.
- Postgres is seeded from `student-profile/init.sql` on first startup (volume-less).

[Copy `.env.example` to `.env` if needed.]

## Screenshots

Include screenshots or screen recordings as you compose, run and test the system. Especially capture any errors you encounter and note how you resolved them.