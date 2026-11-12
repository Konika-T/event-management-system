# Event Management System

Full-stack MERN app: React (Vite + Tailwind) frontend, Express + MongoDB backend, JWT auth.

## Features

**User:** Register, Login, View Events, Search Events, Filter Events by location, Register for an Event, View My Registrations.

**Admin:** Login, Create Event, Update Event, Delete Event, View all Registrations. (Log in with a user whose `role` is `"admin"` — see below.)

## 1. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env`:
- `MONGO_URI` — a local MongoDB (`mongodb://127.0.0.1:27017/event-management-system`) or a MongoDB Atlas connection string.
- `JWT_SECRET` — any long random string.

Run it:

```bash
npm run dev
```

Server starts on `http://localhost:5000`.

## 2. Frontend setup

```bash
cd client
npm install
npm run dev
```

Opens on `http://localhost:5173`.

## 3. Making a user an admin

There's no admin signup UI on purpose. Register a normal account first, then flip its role directly in MongoDB:

```js
// in mongosh, connected to your database
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } })
```

Log out and log back in — you'll now see the **Admin** link in the navbar and get redirected to `/admin` after login.

## Project structure

```
event-management-system/
├── client/   → React app (Vite + Tailwind, React Router, Axios)
└── server/   → Express API (MongoDB/Mongoose, JWT auth, bcrypt, Socket.io)
```

## API overview

| Method | Route                        | Access        |
|--------|------------------------------|---------------|
| POST   | /api/auth/register           | Public        |
| POST   | /api/auth/login              | Public        |
| GET    | /api/events?search=&location=| Public        |
| GET    | /api/events/:id              | Public        |
| POST   | /api/events                  | Admin         |
| PUT    | /api/events/:id              | Admin         |
| DELETE | /api/events/:id              | Admin         |
| POST   | /api/registrations/:eventId  | Logged-in user|
| GET    | /api/registrations/my        | Logged-in user|
| GET    | /api/registrations           | Admin         |

## Notes

- Passwords are hashed with bcrypt before storage — never stored in plain text.
- JWTs are stored in `localStorage` on the client and attached to every API request via an Axios interceptor.
- Socket.io is wired up on the server (`server.js`) but not yet consumed on the frontend — a natural next step would be emitting an event when an admin creates/updates/deletes an event, and having the `Events` page listen for it to auto-refresh the list in real time.
