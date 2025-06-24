# 📚 BookBazaar – REST API for Online Bookstore

> Web Dev Cohort Project
> **Start:** May 29, 2025 – **Due:** Aug 31, 2025

---

## 🔍 Project Overview

BookBazaar is a RESTful API backend built using **Express**, **TypeScript**, and **MongoDB**, designed for an online bookstore platform. It simulates core e-commerce functionality like user authentication, book browsing, purchasing, reviewing, and API key–based access control.

---

## 🚀 Tech Stack

* **Language:** TypeScript
* **Runtime:** Node.js
* **Package Manager:** pnpm
* **Database:** MongoDB with Mongoose
* **Authentication:** JWT + API Key
* **Middleware:** Express, Custom Role/Auth Middleware
* **Bonus:** Razorpay for mock payment handling

---

## 📁 Folder Structure

```
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── config/
├── types/
└── app.ts
└── index.ts

```

---

## 🔐 Auth & API Key Endpoints

| Method | Route            | Description                      |
| ------ | ---------------- | -------------------------------- |
| POST   | `/auth/register` | Register a new user              |
| POST   | `/auth/login`    | Login and receive JWT            |
| POST   | `/auth/api-key`  | Generate a new API key           |
| GET    | `/auth/me`       | Get authenticated user's profile |

---

## 📚 Book Routes

| Method | Route        | Access | Description                          |
| ------ | ------------ | ------ | ------------------------------------ |
| POST   | `/books`     | Admin  | Add a new book                       |
| GET    | `/books`     | Public | List all books with optional filters |
| GET    | `/books/:id` | Public | Get book details                     |
| PUT    | `/books/:id` | Admin  | Update a book                        |
| DELETE | `/books/:id` | Admin  | Delete a book                        |

---

## ✍️ Review Routes

| Method | Route                    | Access        | Description                 |
| ------ | ------------------------ | ------------- | --------------------------- |
| POST   | `/books/:bookId/reviews` | Authenticated | Add review to a book        |
| GET    | `/books/:bookId/reviews` | Public        | List all reviews for a book |
| DELETE | `/reviews/:id`           | Owner only    | Delete a specific review    |

---

## 🛒 Order Routes

| Method | Route         | Access        | Description              |
| ------ | ------------- | ------------- | ------------------------ |
| POST   | `/orders`     | Authenticated | Place an order           |
| GET    | `/orders`     | Authenticated | Get all orders of a user |
| GET    | `/orders/:id` | Authenticated | Get order details by ID  |

---

## 🧾 Database Models

* **User:** username, email, password, role
* **API Key:** key, userId, expiry
* **Book:** title, author, price, description, stock, category
* **Review:** userId, bookId, rating, comment
* **Order:** userId, bookIds, total, status, paymentId
 status

---

## 🔐 Security & Middleware

* JWT authentication for all protected routes
* Role-based access control (admin/user)
* API key middleware for accessing book/order/payment APIs
* Rate limiting & input validation (optional improvements)

---

## 📦 Setup & Installation

```bash
pnpm install
pnpm run dev
```

Make sure to set up the `.env` file with the following variables:

```env
PORT=4000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
ACCESS_TOKEN_EXPIRY=1h
REFRESH_TOKEN_EXPIRY=7d

```

---

## 📮 Postman Collection

A complete Postman collection is included in the `/docs` folder. Import it into Postman to test all endpoints with example payloads.

---

## ✅ Deliverables Checklist

* [x] User Auth + JWT + API Key
* [x] CRUD Operations for Books
* [x] Reviews & Orders Endpoints
* [x] Middleware: Auth, Role, API Key
* [x] Full DB Modeling & Mongoose Setup
* [x] Postman Collection for Testing
* [ ] Razorpay Payment Integration (Bonus)

---

## 📬 Contributing

PRs are welcome for features, bug fixes, or enhancements. Follow best practices, format with Prettier, and ensure types are respected.

---

## 👨‍💻 Author

**Captain Pritam** – Web Dev Cohort 2025
