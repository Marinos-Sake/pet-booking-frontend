# Pet Booking App - Frontend 🐾

Frontend for the Pet Booking project, built with **React**, **Vite**, and **TypeScript**.  
It connects to the [Pet Booking API (Backend)](https://github.com/Marinos-Sake/pet-booking-api).

---

## ✨ Features

- User authentication (JWT) with login/register
- User profile & pets management & payment management
- Room browsing with availability & pricing
- Booking creation with calendar & automatic price calculation
- Payments workflow (PENDING → CONFIRMED → COMPLETED)
- Reviews for completed bookings
- Admin panel for managing users, rooms, bookings, payments
- Responsive UI with TailwindCSS

---

## 🛠 Tech Stack

- **React 19** + **Vite 7**
- **TypeScript 5**
- **React Router 7**
- **TailwindCSS 4** (custom theme)
- **React Day Picker** (calendar for bookings)
- **Lucide React** (icons)
- **JWT Decode** (token parsing client-side)

---

## 🚀 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
    git clone `git@github.com:Marinos-Sake/pet-booking-frontend.git`
    `npm install`
    `npm run dev`

2. Frontend will be available at:
   http://localhost:5174/

3. 🔗 Related Repositories
   [Pet Booking API (Backend)](https://github.com/Marinos-Sake/pet-booking-api).

## 📘 Notes

- API base URL is configured in `.env` (default: `http://localhost:8080/api`)
- Swagger docs for the backend: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
- Admin users have access to `/admin` routes (protected with role-based guard)


