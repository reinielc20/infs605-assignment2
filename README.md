# INFS605-Assignment2-Starter-Files
This is a starter application for a BCIS second-year INFS605 Microservices programming assignment. It includes a containerized student-profile service (Python + Flask), a PostgreSQL database, and docker-compose.yml. Students are to extend the system by adding their own microservices and deploying a small-scale distributed application.

## License

Code in this repository is licensed under the [MIT License](LICENSE).

Assignment instructions, diagrams, and documentation (non-code) are licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

## Microservices Assignment Starter

This repository provides a starter  application for your programming assignment in the INFS605 Microservices course (BCIS Year 2).

You are provided with:
- A `student-profile` microservice built in Flask
- A PostgreSQL container for persistence
- A shared `docker-compose.yml` to deploy services

microservices-assignment/
├── docker-compose.yml
├── README.md
├── student-profile/
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
└── .env.example

Technologies used:
- Python + Flask
- Docker + Docker Compose
- PostgreSQL

Your task is to build additional microservices, connect them using Docker Compose, and demonstrate a small, functional microservices architecture with clear service boundaries.

Start small, and iterate!

You can use this as a starting point for your assignment and consider adding further services – a Course Catalog Service, a Feedback Service, a Notification Service, a Grades Service (that can store and retrieve grades for students and courses), a Timetable Service	(that can show weekly schedules for students or lecturers) an Assignment Tracker (shows coming and submitted assignments), a Room Booking Service (for team meetings), or come more generic services such as – an Image Upload Service, a Search Service, a Logging or Audit Trail Service, Frontend UI, PDF Generator, System Metrics Service.

## Getting Started

### 1. Prerequisites
- Docker
- Docker Compose
- Python (if running services outside of Docker)

### 2. Running the System
```bash
docker-compose up --build
```

### 3. API Endpoints

#### Student Profile Service (http://localhost:5001)
- `GET /students` – Get all students
- `POST /students` – Add a new student


## Environment Variables

Copy `.env.example` to `.env` if needed.

## Screenshots

Include screenshots or screen recordings as you compose, run and test the system. Especially capture any errors you encounter and note how you resolved them

