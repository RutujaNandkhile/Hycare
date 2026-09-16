# HyCare Industries – Full Stack Next.js Website

Complete production-ready website matching the design from your recording, with:

- **Public Website**: Home (with Slider), About, Services, Gallery, Contacts, Application Form
- **OTP-based Login & Registration** (email OTP)
- **Admin Panel**: Dashboard, Photo Gallery CRUD, Slider CRUD, Application Form submissions management
- **MongoDB** database (MERN-style backend via Next.js API routes)
- **Vercel-ready** deployment

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- MongoDB + Mongoose
- JWT Auth + OTP (Nodemailer)
- Lucide icons

## Quick Start

### 1. Install dependencies

```bash
cd hycare-industries
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill values:

```bash
cp .env.example .env.local
```

Required:
- `MONGODB_URI` – MongoDB Atlas connection string
- `JWT_SECRET` – any long random string
- `EMAIL_USER` / `EMAIL_PASS` – Gmail + App Password (optional in dev – OTP is logged to console)
- `ADMIN_EMAIL` – email you will use to login as admin

### 3. Create Admin user

After setting `MONGODB_URI`, start the server and open:

```
http://localhost:3000/api/seed
```

This creates/upgrades the admin account. Then go to `/login` and request OTP with that email.

### 4. Run locally

```bash
npm run dev
```

Open http://localhost:3000

## Deploy on Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import the repo
3. Add all environment variables from `.env.example` in Vercel project settings
4. Deploy

**Important for Vercel:**
- Use MongoDB Atlas (free tier is fine)
- Set `NEXT_PUBLIC_APP_URL` to your Vercel domain
- For email OTP, use a real Gmail App Password or a service like Resend/SendGrid

## Admin Features

| Feature | Path |
|---------|------|
| Dashboard | `/admin/dashboard` |
| Photo Gallery | `/admin/gallery` |
| Home Slider | `/admin/slider` |
| Application Forms | `/admin/applications` |

## Application Form

Public form at `/application-form` stores data in MongoDB. Admins can view and update status (pending → reviewed → contacted → closed).

## OTP Auth Flow

1. User enters email → OTP sent (or shown in console in dev)
2. User enters 6-digit OTP → JWT cookie set → redirected

Admin users (role = admin) are redirected to `/admin/dashboard`.

## Project Structure

```
src/
  app/           # Pages & API routes
  components/    # UI components
  lib/           # db, auth, email
  models/        # Mongoose models
```

## Notes

- In development without email credentials, OTP is returned in the API response and shown on the login/register page.
- Image URLs can be any public URL (Unsplash, Cloudinary, etc.). For production uploads, integrate Cloudinary upload widget or API.
- Delete or protect `/api/seed` after creating the admin account.

© 2026 HyCare Industries

## Authentication / Dashboard Flow
- Register uses email OTP verification and then saves the user in MongoDB.
- Login uses only Username + Password.
- Both `admin` and `user` are redirected to `/admin/dashboard`.
- The shared dashboard displays active Home Slider items and Gallery photos to both roles.
- Only an `admin` can open the management links/APIs for Users, Gallery, Slider, and Applications.
- Gallery and Slider public GET APIs read active MongoDB records, so anything an admin adds becomes visible on the home page after the next fetch.
- Image uploads require Cloudinary configuration for real uploaded images (recommended for Vercel deployment).


## Authentication & Dashboard Flow
- Registration uses email OTP verification.
- Login uses Username + Password only.
- Both `admin` and `user` roles redirect to `/admin/dashboard`.
- Both roles can view the active Home Slider and Gallery on `/admin/dashboard`.
- Only an admin can create, edit, or delete Slider/Gallery records.
- Active records saved by an admin are read by `/api/slider` and `/api/gallery`, so they appear on the public Home page without changing the existing UI design.
- Admin credentials are stored in MongoDB as a bcrypt password hash.
