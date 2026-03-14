#  HomeHero – Local Household Service Finder

HomeHero is a modern web application that helps users find trusted local household service providers such as electricians, plumbers, cleaners, and more. Users can explore services, book appointments, and leave ratings, while service providers can add, update, and manage their services easily.

 **Live Site:** 



---

##  Key Features

-  **Browse Local Services**  
  Users can explore a variety of local household services displayed in a clean card layout.

- **Booking System**  
  Customers can book services through a booking modal and manage bookings from the *My Bookings* page.

- **Service Provider Dashboard**  
  Providers can add, update, and delete their services from the *My Services* page.

-  **Rating & Review System**  
  Users can leave ratings for services they have booked, and the top-rated services appear on the homepage.

-  **Secure Authentication**  
  Firebase authentication with Email/Password login and Google login option.

---

## 🖥️ Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- DaisyUI
- Framer Motion
- React Hot Toast / SweetAlert2

### Backend
- Node.js
- Express.js
- MongoDB

### Authentication
- Firebase Authentication

### Deployment
- Client: Netlify / Firebase / Surge  
- Server: Vercel

---

##  Responsive Design

The application is fully responsive and optimized for:

-  Mobile devices
-  Tablets
-  Desktop screens

---

##  Main Functionalities

###  Home Page
- Hero slider with at least **3 slides**
- Dynamic section showing **6 services from the database**
- Animation using **Framer Motion**
- Two additional custom sections 

---

###  Authentication System

#### Login
- Email & Password login
- Google login
- Error and success messages via **Toast**

#### Register
- Name
- Email
- Photo URL
- Password with validation:
  - Minimum **6 characters**
  - At least **one uppercase letter**
  - At least **one lowercase letter**

---

###  User Profile

Users can view their profile information including:

- Name
- Email
- Photo
- Last login time

Users can also **update their name and profile image**.

---

##  CRUD Operations

### Service Providers

####  Add Service
Providers can add a new service with:
- Service Name
- Category
- Price
- Description
- Image URL
- Provider Name
- Provider Email

Data is stored in **MongoDB Services Collection**.

---

#### My Services
Providers can view all services they created in a **table format**.

Actions available:
-  Update service
-  Delete service

---

### Customers

####  Service List
Displays all services in **card format** with:
- Image
- Service Name
- Price
- Details button

---

####  Service Details
Shows full service information including:

- Service description
- Provider information
- Price
- Reviews
- **Book Now button**

---

###  Booking System

Clicking **Book Now** opens a modal containing:

- Service information
- Booking form

Booking data stored in **Bookings Collection**.

Fields include:

- userEmail
- serviceId
- bookingDate
- price

---

###  My Bookings

Users can view all booked services in a **table format**.

Features:
- Booking details
- Cancel booking option (DELETE)

---

##  Database Structure

### Services Collection
Stores all service listings.





