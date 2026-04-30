# NovaCommerce - Futuristic E-commerce Platform

NovaCommerce is a modern, high-tech e-commerce platform built with Next.js, Prisma, and Tailwind CSS. It features a futuristic UI/UX with smooth animations and a seamless shopping experience.

## 🚀 Features

- **Futuristic UI**: Immersive design using Framer Motion and Tailwind CSS.
- **Product Management**: Full product catalog with detailed descriptions and category filtering.
- **Dynamic Categories**: Easy navigation through advanced tech categories (Audio, Wearables, Laptops, Phones).
- **Cart & Checkout**: Fully functional cart system with local storage persistence and a multi-step checkout flow.
- **Secure Authentication**: Built-in authentication for Buyers, Sellers, and Admins using NextAuth.js.
- **Responsive Design**: Optimized for all devices, from mobile to desktop.

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router), [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **Backend**: Next.js API Routes, [Prisma ORM](https://www.prisma.io/)
- **Database**: SQLite (Development) / MongoDB (Configurable via Prisma)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Getting Started

### Prerequisites

- Node.js (Latest LTS)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd new-ecom
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory and add your configuration (Database URL, Auth Secret, etc.).

4. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Seed the database with sample products:
   ```bash
   npm run seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the results.

## 📄 License

This project is licensed under the MIT License.
