# Portfolio Backend

Backend for my personal portfolio site (anwarali.netlify.app). Built with Node.js, Express, and MongoDB. The frontend calls this API to load and manage everything on the site — skills, projects, resume data, and contact messages.

I built this so the portfolio isn't just a static page. There's a private admin panel on the frontend that talks to these routes, so I can add or edit content directly instead of touching code every time something needs to change.

## What it does

- Admin authentication using JWT, with passwords hashed using bcrypt
- CRUD APIs for skills and projects, managed through the admin panel
- Stores and serves resume data
- Handles contact form submissions from the site
- File uploads (resume PDF) handled with multer, stored on Cloudinary

## Tech stack

Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, multer, Cloudinary

## Project structure

```
models/       Mongoose schemas (Admin, Project, Skill, Message, etc.)
routes/       API route definitions
controllers/  Route logic (auth, CRUD operations)
seedAdmin.js  One-time script to create the initial admin user
```

## Running it locally

```
git clone https://github.com/Anwar8755/portfolioB.git
cd portfolioB
npm install
```

Create a `.env` file in the root:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=your_admin_username
ADMIN_SEED_PASSWORD=your_admin_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

Run the seed script once to create the admin user, then start the server:

```
node seedAdmin.js
npm start
```

## Deployment

Deployed on Render. The frontend is built with React and hosted separately on Netlify.

Frontend repo: https://github.com/Anwar8755/portfolio-frontend

## Notes

This is an ongoing project — I keep extending it as I add new sections to the portfolio. The live site is the best way to see it in action: anwarali.netlify.app
