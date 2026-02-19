# 📊 Expense Tracker Pro

Expense Tracker Pro is a full-stack Node.js application that helps users manage their income and expenses with ease. It provides secure authentication, balance tracking, and user-friendly endpoints to log and review financial activity.

---

## 🚀 Features

- 🔐 **User Authentication** (Register/Login with JWT)
- ➕ **Add Income & Expenses**
- 📈 **Real-time Balance Calculation**
- ❗ **Input Validation & Error Handling**
- 🗂️ **Modular Structure (MVC Pattern)**
- 🧪 **Postman Collection for Testing**

---

## 🛠️ Tech Stack

| Layer         | Technology             |
|--------------|------------------------|
| Backend       | Node.js, Express.js    |
| Database      | MongoDB, Mongoose      |
| Authentication| JWT, bcrypt            |
| Validation    | validator.js           |
| Testing       | Postman                |

---

## 📁 Folder Structure
Expense_Tracker_Pro/
│
├── controllers/ # Business logic
├── middleware/ # Custom middleware (auth, error handling)
├── models/ # MongoDB models using Mongoose
├── routes/ # Express route definitions
├── utils/ # Helper functions
├── postman/ # Postman collection for API testing
├── .env # Environment variables
├── app.js # Application entry point
└── package.json # Project metadata and scripts


---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/expense-tracker-pro.git

# Navigate into the project directory
cd expense-tracker-pro

# Install dependencies
npm install

# Create an environment file
touch .env

# Start the development server
npm run dev
| Method | Endpoint                      | Description                   |
| ------ | ----------------------------- | ----------------------------- |
| POST   | /api/auth/register            | Register a new user           |
| POST   | /api/auth/login               | Login with email and password |
| POST   | /api/transactions/add-income  | Add an income transaction     |
| POST   | /api/transactions/add-expense | Add an expense transaction    |
| GET    | /api/transactions/history     | Get all transactions          |
| GET    | /api/transactions/balance     | Get current balance           |


