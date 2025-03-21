
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# 🛒 Tech Gear Webshop

## 📌 Project Description
Tech Gear is a modern e-commerce platform for tech gadgets. The webshop provides a smooth shopping experience with dynamic product listings, a shopping cart, secure payments, and user authentication. 

The project is built using **Next.js**, **TypeScript**, **Tailwind CSS**, and **ShadCN UI**, with **Zustand** for cart state management, **Prisma** for database interaction, and **Zod** for form validation. Additionally, **Framer Motion** is used to enhance the UI with animations.

Check out the **"package.json"-file** för scripts and dependencies.

---

## 🚀 Technologies Used
| Technology       | Purpose and documentation
|-----------------|---------|
| **Next.js**      | React framework for SSR & SSG https://nextjs.org/docs |
| **Tailwind CSS** | Utility-first CSS framework for styling https://tailwindcss.com/docs |
| **ShadCN UI**    | Component library for UI elements https://ui.shadcn.com |
| **Framer Motion** | Animations and UI transitions https://www.framer.com/motion |
| **Zustand**      | State management for cart functionality https://docs.pmnd.rs/zustand |
| **Prisma**       | ORM for database management https://www.prisma.io/docs |
| **Zod**         | Form validation and schema definition https://zod.dev
 |

---

## 🔧 Installation & Setup

### **1. Clone the repository**
```sh
git clone https://github.com/plugga-tech/nextjs-webshop-ts-react-theshop.git

cd nextjs-webshop-ts-react-theshop
```

### **2. Install dependencies**
Using npm:
```sh
npm install
```
Using yarn:
```
yarn install
```
### **3. Set up environment variables**
Create a .env.local file in the project root and add the necessary API keys and database connection details:

```sh
DATABASE_URL=your_database_url
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_secret_key
NEXTAUTH_SECRET=your_nextauth_secret
```

### **4. Migrate the database**
If you're using Prisma, apply migrations:

```sh
npx prisma migrate dev
```

### **5. Start the development server**
```sh
npm run dev
```
or using yarn
```sh
yarn dev
```

