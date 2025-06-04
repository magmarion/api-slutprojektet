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
|                   |

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

# ✅ Kravspecifikation

## Grundläggande krav

- [x] Alla sidor skall vara responsiva – _Implementerat med Tailwind CSS och responsiv design_
- [x] Arbetet ska implementeras med NextJS – _Bygger helt på Next.js App Router och Server Components_
- [x] Backenden ska ha validering på samtliga endpoints (även Server Actions) – _Zod används för validering i alla Server Actions_
- [x] Skapa ett ER diagram som ska ha visats vid idégodkännandet – _ER-diagram skapades utifrån Prisma-modellen_
- [x] Beskriv er företagsidé i en kort textuell presentation – _Se projektbeskrivningen ovan om Bloom Webshop_

## Datahantering

- [x] All data ska vara sparad i en SQL databas (produkter, beställningar, konton, mm) med undantaget av bilder – _PostgreSQL via Prisma ORM_
- [x] Inga lösenord får sparas i klartext i databasen – _Säker lösenordshantering med Better Auth_
- [x] Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera – _Många-till-många-relation mellan produkter och kategorier_

## Användarfunktionalitet

- [x] Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten – _Zustand state manager med local storage_
- [x] En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in – _Sign-up/sign-in via Better Auth_
- [x] Användaren måste vara inloggad som kund innan beställningen skapas – _Auth-verifiering i checkout_
- [x] Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält – _Validering med Zod och React Hook Form_
- [x] När man är inloggad som kund ska man kunna se sina gjorda beställningar och om de är skickade eller inte – _"My Orders"-sektion för inloggade användare_

## Produktvisning & Beställning

- [x] Från hemsidan ska man kunna se en lista över alla produkter – _Produktlistning på startsidan_
- [x] Man ska kunna lista bara de produkter som tillhör en kategori – _Kategorifiltrering med dynamiska routes_
- [x] En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen – _Checkout-flöde med lagersaldouppdatering_

## Adminfunktionalitet

- [x] Man ska kunna logga in som administratör i systemet – _Admin-roll i auth-systemet och skyddade routes_
- [x] Administratörer ska kunna uppdatera antalet produkter i lager – _Lagerhantering via admin-dashboard_
- [x] Administratörer ska kunna se en lista på alla gjorda beställningar – _Orderlista i admin-panelen_
- [x] Administratörer ska kunna redigera produkter – _CRUD-operationer för produkter via admin-gränssnitt_
- [x] Administratörer ska kunna lägga till och ta bort produkter – _Formulär för att skapa/ta bort produkter_
- [x] Administratörer ska kunna markera beställningar som skickade – _Orderstatusuppdatering i admin-panelen_
