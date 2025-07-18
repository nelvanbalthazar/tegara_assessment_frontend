# 🔍 Job Match Portal – Frontend

This is the frontend for the **Job Match Portal** web application.

## 📦 Tech Stack

- **Frontend**: React, TypeScript, Redux, Vite  
- **Backend**: See details in the [Backend Repository](#) `README.md`

---

## 🔐 Authentication Flow

1. User login data is **seeded during backend service startup**.
2. When logging in with a valid email and password, users are redirected to the **OTP verification page**.
3. An OTP will be **sent to the registered email**.
   > Ensure the email is **active and valid**.
4. After successfully verifying the OTP, the user will be redirected to the **Dashboard page**.

---

## 👤 User Roles & Features

### 🔑 Admin

- **Dashboard**  
  - Shows **match scoring** between candidates and job openings.  
  - **Filters scores > 70 only**  
  - Displays **top 50 matched candidates**.

- **Create User**  
  - Register new users for login access.

- **User List**  
  - Displays all registered users.  
  - Allows **changing user roles**.

- **Job**  
  - View job openings.  
  - **Delete job postings**.

- **Create Job**  
  - Add new job openings.

---

### 👥 Recruiter

- **Dashboard**  
  - Displays scoring between candidates and job openings.  
  - Shows **top 50 candidates** with **scores > 70**.

- **Create Candidate**  
  - Add a candidate with name, email, phone, and location.

- **Candidate List**  
  - View all submitted candidates.

- **Upload CV**  
  - Upload a candidate’s CV.  
  - Automatically extracts and fills:
    - **Skills**
    - **Education**
    - **Experience**

---

## 🚀 How to Run Locally

> Make sure you have **Node.js v22.15.0** installed to avoid compatibility issues.

### 🔧 Setup Instructions

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open the application in your browser
http://localhost:5173
