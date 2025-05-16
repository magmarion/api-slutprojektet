// prisma/client.ts
import { PrismaClient } from "../generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

// Typa resultatet så TypeScript förstår modellerna
const client = new PrismaClient();
const db = client.$extends(withAccelerate());

export { db };
