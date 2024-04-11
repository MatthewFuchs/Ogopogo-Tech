# Project Overview

Welcome to our Online Learning Platform! This web-based learning platform is designed to provide users with the ability to sign up for online courses. Whether you are a student looking to expand your knowledge or an instructor eager to share your expertise, our platform caters to both.

## Key Features

### User Authentication:
Users can create accounts, log in, and securely authenticate their identity.

Password recovery and account management features for user convenience.

## Course Enrollment:
Users can browse a catalog of available courses and enroll in the ones that interest them.
Seamless enrollment process with confirmation and notification functionalities.

## User Roles:
The platform supports different user roles, including students, teachers and administrators.
Administrators have special privileges to manage courses, users, and overall platform settings.

## Interactive Dashboard:
Personalized dashboards for users, displaying enrolled courses, progress, and other relevant information.
Dashboard for teachers to upload and grade assignments. 
Admin dashboard for monitoring and managing the platform's overall performance as well as creating courses and accepting users in courses.

## Course Content Management:
Instructors can create and manage course content, including lectures, assignments, and assessments.
Multimedia support for a rich learning experience.

## Discussion Forums:
Each course has its own discussion forum for collaborative learning and interaction between students and instructors.
Admin moderation to ensure a positive and engaging community.


## Responsive Design:
Built using React.js for a responsive and user-friendly front-end experience.
Python backend for robust and scalable server-side operations.

# Getting Started

To get started with the Online Learning Platform locally, follow these steps:

## Clone the Repository:

```
git clone https://github.com/MatthewFuchs/Ogopogo-Tech.git
```

## Install Dependencies:

```
virtualenv venv
activate venv
```
```
cd Ogopogo-Tech
pnpm install                      # For frontend 
pip install -r requirements.txt   # For backend
```

## Configure Environment Variables:
Set up environment variables for sensitive information such as API keys and database credentials.

## Run the Application:
Start the React.js development server for the front-end.

```
pnpm dev run
```

## Launch the Python backend server.

```
python server.py
```

Open in Browser:
Open your browser and navigate to http://localhost:3000 to access the platform.

Happy learning! 🚀
