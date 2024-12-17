# MoneyUP

link to app : https://moneyup.ngrok.app/

A personal financial tracker that allows users to manage their income, expenses, and financial goals. The app provides an intuitive interface to track finances and helps users achieve their financial targets (soon to be implemented).

## Features

- **User Management**: Register and authenticate users securely.
- **Income & Expense Tracking**: Record and categorize income and expenses.
- **Categories**: Customize categories for both income and expenses.
- **Goals**: Set financial goals and track progress towards them. (to be implemented in the future)
- **Rate Limiting**: Protects against abuse with rate-limiting.
- **Form Validation**: Uses JOI for data validation.

## Tech Stack

- **Frontend**: React
- **Backend**: Express.js
- **Database**: MySQL with Prisma ORM
- **Validation**: JOI for form data validation
- **Security**: Rate-limiting middleware
- **Authentication**: JWT-based authentication

## Database Schema

The application uses a MySQL database with the following Prisma schema:

### Models

- **User**: Stores user details including name, email, password, and related financial data.
- **Income**: Records user income entries, including the amount, description, and category.
- **Expense**: Tracks user expenses, including amount, description, and category.
- **Category**: Defines income and expense categories unique to each user.
- **Goal**: Tracks user goals with target amounts, current amounts, and deadlines.

### Relationships

- A `User` can have multiple `Income`, `Expense`, `Category`, and `Goal` entries.
- `Income` and `Expense` are linked to `Category`.
- `Goal` tracks progress towards a specific target amount for a user.

## Setup

1. **Clone the repository:**
   ```git clone https://github.com/graysonLL/MoneyUP.git```
2. **Install dependencies**
   
Frontend (React)
```
cd client
npm install

```
Backend (Express with Prisma)
```
cd server
npm install

```
3. **Setup environment variables:**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=finance_tracker
PORT=3001
DATABASE_URL="mysql://root:@localhost:3306/finance_tracker"
JWT_SECRET=your-secret-key-here
```
4. **Migrate the database:**
   
-Ensure your MySQL server is running.

-Run the Prisma migration to create the necessary tables:

```
cd server
npx prisma migrate dev --name init

```

5. **Start the application:**
   
Frontend 
```
cd client
npm start

```
Backend (Express with Prisma)
```
cd server
node server.js

```

