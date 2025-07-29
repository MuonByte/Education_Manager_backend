## 🛠️ How to Run the Project Locally

This guide will help you run the backend locally, set up environment variables, and understand the project structure (especially the `build/` directory).

---

### ✅ Prerequisites

- Node.js v16 or higher
- MySQL server running locally
- Internet connection (for email sending via SMTP)

---

### 🚀 Steps to Run

1. **Clone the Repository**

```bash
git clone https://github.com/MuonByte/Education_Manager_backend.git
cd Education_Manager_backend


Install Required Packages

bash
Copy
Edit
npm install
Create a .env File

In the root directory, create a file named .env and add the following:

env
Copy
Edit
PORT=5000

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=education_db

JWT_SECRET=your_jwt_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password
Replace the values with your actual credentials.

Build the Project

bash
Copy
Edit
npm run build
Start the Server

bash
Copy
Edit
npm start
Or, if you want to run the built version directly:

bash
Copy
Edit
node build/index.js
📁 Project Structure (build folder)
After running npm run build, the compiled files will be inside the build/ folder:

bash
Copy
Edit
build/
├── config/           # Environment configs (SMTP, DB)
├── controllers/      # Request handlers
├── models/           # Database models
├── routers/          # API routes
├── utils/            # Helper functions (auth, sendEmail, etc.)
└── index.js          # Server entry point
This folder is generated from your original source files (usually in src/
