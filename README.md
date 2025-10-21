# INFS605-Assignment2-Student Services DashBoard
Student name: Reiniel Cruz
Student ID: 21145465
Course: INFS605 Microservices
Submission Date: 21/10/2025

# Description
This project is a microservices-based Student Services Dashboard built with Python (Flask), PostgreSQL, Docker, and React (Vite).
It demonstrates the implementation of the 3 microservices chosen by me to add in the original Student Services DashBoard. Which simulates the basic university operations. 

# Microservices Implemented
Service:(Student Profile) Description:(Manages student data stored in PostgreSQL.) Port:(5001)  
Service:(Course Catalogue) Description:(Lists available courses and allows adding new ones.) Port:(5002)  
Service:(Feedback Service) Description:(Accepts student feedback for courses.) Port:(5003)  
Service:(Notification Service) Description:(Sends simulated notifications when feedback is received.) Port:(5004)  
Service:(Frontend - Admin UI) Description:(React based interface to view and manage data.) Port:(3000)  
Service:(PostgreSQL Database) Description:(Stores student records.) Port:(5432)

All services are connected via a shared Docker network (microservices-net).

#Technologies used
- Terminal (macOS)
- Docker + DockerCompose 
- Python 3 + Flask 
- React (Vite)
- PostgreSQL

## Set up Instructions 

1. Clone the Repository (git clone https://github.com/<reinielc20>/infs605-assignment2.git
cd infs605-assignment2)

2. Build and Run Containers (docker compose up -d --build)

3. Access Services
- Frontend http://localhost:3000
- Student API (http://localhost:5001/students)
- course-catalogue API (http://localhost:5002/courses)
- Feedback API (http://localhost:5003/feedback)
- Notification API (http://localhost:5004/notifications)


#Add Feedback

curl -X POST http://localhost:5003/feedback \
  -H "Content-Type: application/json" \
  -d '{"course": "INFS605", "rating": 5, "comment": "Great course!"}'

#Trigger Notification
c
url -X POST http://localhost:5004/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "New feedback added for INFS605"}'

# Directory Structure

infs605-assignment2/
├── docker-compose.yml
├── README.md
├── architecture-diagram.png
│
├── Documentation/
│   ├── Testing Screenshots.pdf
│   └── errorlog.txt
│
├── student-profile/
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── course-catalogue/
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── feedback/
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── notification/
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   └── package.json
│
└── postgres/
    └── init.sql


## Flow 

Frontend - Student Profile / Course catalogue / Feedback - notification 
   PostgreSQL (data persistence)

# Architecture Diagram
Architecture Diagram (architecture-diagram.png)


# Notes 
- Each service runs independently in its own container 
- Communication between services happens via HTTP on the internal Docker network
- Future improves: integrate feedback and notification trigger automatically

## Reflection
Throughout this project, I learned how to design and deploy microservices using Docker Compose and Flask.  
The most challenging part was resolving container build errors and missing dependencies.  
By troubleshooting these issues, I improved my understanding of Docker networks and service orchestration.

















		











