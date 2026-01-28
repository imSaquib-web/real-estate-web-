# Real Estate Management System

A full-stack MERN application to manage property listings for rent and sale with authentication.

## Tech Stack

React, Node.js, Express, MongoDB, JWT, Cloudinary

## Features

- User registration & login with JWT authentication
- Add, edit, delete properties (owner only)
- View all properties with pagination
- Filter properties by type and price range
- Image upload to Cloudinary
- Direct contact (call & WhatsApp buttons)
- Secure APIs with authentication


### Backend

```bash
cd server
npm install
# Create .env file with DB_URL, JWT_SECRET, Cloudinary credentials
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## API Endpoints

- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/properties` - Get all properties
- `GET /api/properties/filter` - Filter properties
- `POST /api/properties` - Create property (auth required)
- `PUT /api/properties/:id` - Update property (auth required)
- `DELETE /api/properties/:id` - Delete property (auth required)

## Live Demo

https://real-estate-web-drab.vercel.app/
