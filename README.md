# Movieplex

**Movieplex** is a two-module web application designed to support cinema operations and improve the moviegoing
experience, offering intuitive tools for staff management and customer reservations.

## 🎬 Description

The application is split into two main modules:

### 🎛️ Management Module

- Manage movie listings and showtimes via an interactive calendar
- Create, edit, and remove film entries
- Generate and oversee voucher codes
- Update or delete scheduled screenings
- Access restricted to authorized cinema staff

### 🎟️ Reservation Module

- Browse current and upcoming movies
- View detailed movie descriptions and showtimes
- Reserve seats through a simple, responsive booking interface

## ✨ Features

- Two separate modules: Management and Reservation
- Calendar-based scheduling interface
- Voucher system for promotional campaigns
- Real-time seat reservation and availability tracking
- Clean, responsive UI for both staff and customers

## 🛠️ Tech Stack

- **React 18**
- **TypeScript**
- **Redux Toolkit**
- **React Router 6**
- **PrimeReact** (UI components)

## 🪪 Credentials

You can use the following credentials to log into the application:

- **Email:** `Admin@gmail.com`
- **Password:** `123456`

## 🚀 Getting Started

To run the project locally:

```bash
cd api && npm install
cd apps/management && npm instal
cd apps/reservation && npm install
npm run start:db
npm run start:management
npm run start:reservation
