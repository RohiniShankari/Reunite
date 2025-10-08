# Reunite - Lost & Found Web App

**Tagline:** "Lost it? Found it? Reunite it!"

Reunite is a web application that helps users report lost and found items, connect with the item's owner, and manage their listings. Users can create listings with descriptions, images, and locations, and contact owners through notifications.

---

## Features

- **User Authentication**
  - Login and registration with JWT-based authentication.
- **Listings**
  - Create, view, and delete lost or found item listings.
  - Upload images for listings using Cloudinary.
- **Filters**
  - Filter listings by type: "Lost" or "Found".
- **Messaging**
  - Notify owners about listed items.
  - Unread message notifications for logged-in users.
- **Responsive Design**
  - Mobile-friendly with adaptive UI components.
- **Protected Routes**
  - Certain pages like creating listings and messaging are accessible only to logged-in users.

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (with Mongoose)  
- **File Storage:** Cloudinary (for image uploads)  
- **Authentication:** JWT (JSON Web Token)

---

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/repo-name.git
cd repo-name
# Backend
cd ../backend
npm install

# Frontend
cd ../frontend
npm install

```
##SetUp env

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
---
##Run backend
```bash
cd backend
npm run dev
```
##Run frontend
```bash
cd frontend
npm run dev
```


