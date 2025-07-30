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
```

2. **Install Required Packages**

```bash
npm install
```

3. **Create a `.env` File**

In the root directory, create a file named `.env` and add the following:

```env

# CONFIG
CONFIG_HOST=localhost
CONFIG_PORT=3000
CONFIG_SECRET=5032dbcb-fb79-4e2a-8b42-c05dca15e1f0
#DB
DB_NAME=emdb
DB_USER=root
DB_PASSWORD=
DB_HOST=127.0.0.1

#SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tatalatef64@gmail.com
SMTP_PASS=rcya csxx miqd lpnr

#jwt
JWT_SECRET=tutorial22tutorial

#AI
AI_IP=192.168.1.12
AI_port=2050

```

> Replace the values with your actual credentials.



4. **Start the Server**

```bash
npm run start
```

Or, if you want to run the built version directly:

```bash
node build/index.js
```

---

### 📁 Project Structure (build folder)

After running `npm run build`, the compiled files will be inside the `build/` folder:

```
build/
├── config/           # Environment configs (SMTP, DB)
├── controllers/      # Request handlers
├── models/           # Database models
├── routers/          # API routes
├── utils/            # Helper functions (auth, sendEmail, etc.)
└── index.js          # Server entry point
```

> This folder is generated from your original source files (usually in `src/`).

---

### ❗Troubleshooting

- **ECONNREFUSED** → Check if MySQL is running and `.env` credentials are correct.
- **Module Not Found** → Run `npm install` again to ensure all dependencies are installed.
- **SMTP/Email Errors** → Double-check SMTP credentials. If using Gmail, allow "less secure apps" or use App Passwords (for 2FA).

---
###Importent Note
if u want to test backend only to test chatbot backend u can use my mock server by change the .env file such.

```env
#AI
AI_IP=localhost
AI_port=3000

```
---

### 📬 Support

If you face issues, feel free to open an issue on the GitHub repository.

---

### 🔗 Repository

[https://github.com/MuonByte/Education_Manager_backend](https://github.com/MuonByte/Education_Manager_backend)
