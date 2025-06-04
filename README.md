# 🛒 Bloom Webshop

## 📌 Project Description

Bloom is a modern and user-friendly webshop that offers a carefully selected range of flowers and plants for both indoors and outdoors. We focus on quality and simplicity. Customers should be able to easily find, order and have their favorite plants delivered to their home. With a clear category system, personal shopping cart and a smooth checkout, BLOOM makes it easy to spread green joy – all year round.

The project is built using **Next.js** and **Server Actions**, **TypeScript**, **Tailwind CSS**, and **ShadCN UI**, with **Zustand** for cart state management, **Prisma** for database interaction, and **Zod** for form validation. Additionally, **Framer Motion** is used to enhance the UI with animations.

Check out the **"package.json"-file** for scripts and dependencies.

---

## 🚀 Technologies Used

| Technology        | Purpose and documentation                                            |
| ----------------- | -------------------------------------------------------------------- |
| **Next.js**       | React framework for SSR & SSG https://nextjs.org/docs                |
| **Tailwind CSS**  | Utility-first CSS framework for styling https://tailwindcss.com/docs |
| **ShadCN UI**     | Component library for UI elements https://ui.shadcn.com              |
| **Framer Motion** | Animations and UI transitions https://www.framer.com/motion          |
| **Zustand**       | State management for cart functionality https://docs.pmnd.rs/zustand |
| **Prisma**        | ORM for database management https://www.prisma.io/docs               |
| **Zod**           | Form validation and schema definition https://zod.dev                |
|  |

---

## 🔧 Installation & Setup

### **1. Clone the repository**

```sh
git clone https://github.com/magmarion/api-slutprojektet.git

cd api-slutprojektet
```

### **2. Install dependencies**

```bash
npm install
```

```bash
yarn install
```

```bash
pnpm install
```

```bash
bun install
```

### **3. Set up environment variables**

Create a .env.local file in the project root and add the necessary API keys, credentials and URLs:

```sh
# Prisma Accelerate connection
DATABASE_URL=your_database_url

# Better Auth secret and URL
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:5173

# GitHub OAuth credentials
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_secret_key

# Google OAuth credentials
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_secret_key
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

```sh
yarn dev
```

```sh
pnpm dev
```

```sh
bun run dev
```
