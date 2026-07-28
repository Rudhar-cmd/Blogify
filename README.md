# Blogify

Blogify is a full-stack blogging platform that allows users to create, edit, delete, like, and comment on blog posts. It features secure authentication, category-based organization, image uploads, and a responsive user interface.

## Live Demo

Frontend: https://blogifylive.netlify.app

Backend API: https://blogify-7ibm.onrender.com

## Features

- User Registration and Login
- JWT Authentication using HTTP-Only Cookies
- Create, Edit, and Delete Blog Posts
- Upload Blog Images using Cloudinary
- Like and Comment on Blog Posts
- User Profile with Blog Statistics
- Category-Based Blog Organization
- Responsive User Interface
- Secure Protected Routes

## Tech Stack

### Frontend

- HTML
- CSS
- JavaScript
- Axios

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Multer
- Cloudinary
- Cookie Parser
- bcrypt
- CORS

## Project Structure

```
Blogify
│
├── Backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── app.js
│   └── server.js
│
├── frontend
│   ├── css
│   ├── js
│   ├── pages
│   └── assets
│
└── README.md
```

## Installation

### Clone the Repository

```bash
git clone https://github.com/Rudhar-cmd/Blogify.git
cd Blogify
```

### Backend Setup

Navigate to the backend folder.

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` folder and add the following environment variables:

```env
PORT=

MONGODB_URI=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

CORS_ORIGIN=
```
Start the backend server.

```bash
npm start
```

### Frontend Setup

Open the `frontend` folder using Live Server or deploy it using Netlify.

## Available Features

### Authentication

- Register User
- Login User
- Logout User
- Change Password
- Update Profile
- Update Avatar

### Blogs

- Create Blog
- Update Blog
- Delete Blog
- View All Blogs
- View Single Blog

### Categories

- Create Category
- View Categories

### Likes

- Like Blog
- Unlike Blog

### Comments

- Add Comment
- Delete Comment
- View Comments

## Authentication

The application uses:

- JWT Access Tokens
- JWT Refresh Tokens
- HTTP-Only Cookies
- Protected Routes

## Future Improvements

- Rich Text Editor
- Search Functionality
- Dark Mode
- Email Verification
- Password Reset
- Bookmark Blogs
- Pagination
- User Notifications
- Admin Dashboard

## Author

Rudhar Gupta

GitHub: https://github.com/Rudhar-cmd

## License

This project is intended for learning and portfolio purposes.
