"# url-shortner" 

📌 URL Shortener — MERN Stack Project

A fast, secure, and full-stack URL Shortener application built using the MERN stack. This project allows users to shorten long URLs, track click counts, manage their links through a dashboard, and redirect using unique short IDs.

This system includes authentication, analytics, CRUD operations, and a clean user interface.

🚀 Features
🔗 URL Shortening

Converts long URLs into unique short IDs

Instant response and redirection support

Automatically tracks click counts

👤 User Authentication (JWT + bcrypt)

Register, Login, Logout

Password encryption

Secured endpoints using JWT middleware

📊 Dashboard

Displays all URLs created by the logged-in user

Shows original URL, short URL, click count

Allows deleting URLs

↪️ Redirection

Short URL → redirects to the original long URL

Automatically increments click count

🛡 Secure Backend

Protected API routes

Input validation

Error handling

⚙️ Tech Stack

Frontend: React, Axios, React Router
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Auth: JWT, bcryptjs
