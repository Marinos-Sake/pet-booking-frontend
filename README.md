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

### 🧪 Testing

The front-end has been tested manually through user interactions such as clicks, navigation, and form submissions.  
These tests validated that the UI behaves correctly and integrates properly with the back-end API.

---

## Future Improvements

1. **UI & UX Enhancements**  
   Refine responsiveness, improve navigation, and add loading states and error boundaries for a smoother and more user-friendly experience across all devices.

2. **Better Separation of Concerns**  
   Restructure components and services to keep presentation, business logic, and API calls clearly separated, ensuring maintainability and scalability.

3. **Codebase Cleanup & Maintainability**  
   Apply linting rules, enforce naming conventions, reduce duplication, and create more reusable components to improve overall readability.

5. **Consistency with Back-end Improvements**
    - Handle soft deletes gracefully in the UI (e.g., canceled bookings).
    - Improve error handling and display user-friendly error messages aligned with the back-end `ErrorHandler`.
    - Avoid over-fetching user details; show only essential information.
    - Add missing CRUD operations in the UI (pets, bookings, reviews, attachments).

6. **Refresh Token Support**  
   Extend authentication with refresh tokens to maintain secure sessions without frequent re-logins when access tokens expire.

7. **Testing Strategy**  
   Introduce unit and integration tests for critical flows (authentication, bookings, payments) to ensure front-end reliability and maintainability.

8. **Improved User Feedback on Actions**  
   Provide clearer and more consistent UI feedback for user actions (e.g., success notifications, error alerts, confirmation dialogs) to enhance the overall user experience.

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


