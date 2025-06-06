Status till 6th June 2025, 23:45pm ->

# Base Setup:
1. Project initialized with Git + NPM
2. Installed core backend dependencies (Express, Mongoose, etc.)
3. Created structured folder layout
4. Connected MongoDB with connectDB()
5. Created base server with Express
6. Configured environment variables with .env

# Models (Data Layer):
1. userModel.js:
a. Fields: name, email, password
b. Password hashing with bcryptjs
c. matchPassword() method for login
2. taskModel.js:
a. Fields: title, description, completed, user
b. user is a foreign key via mongoose.Schema.Types.ObjectId

# Core Features Built:
1. Auth System (JWT based):
a. registerUser: POST /api/auth/register
b. loginUser: POST /api/auth/login
c. generateToken.js: signs JWT
d. Password hashing & comparison handled
e. Token returned on successful login/registration
f. Get the profile of logged-in user: GET /api/auth/me

2. Auth Routes
a. POST /api/auth/register
b. POST /api/auth/login
c. GET /api/auth/me

# Authorization Middleare
1. authMiddleware.js created
2. Validates JWT
3. Extracts & attaches req.user to requests
4. All /api/tasks routes are now protected

# Task CRUD Features:
1. createTask: create tasks (by logged-in user only) -> /api/tasks/createTask
2. getTasks: get user's tasks (by logged-in user only) -> /api/tasks/getTasks
3. updateTask: update task (by logged-in user only) -> /api/tasks/:id
4. deleteTask: delete task (by logged-in user only) -> /api/tasks/:id
5. All task routes are protected via JWT.
