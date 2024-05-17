import { Server } from "./presentation/server"
import { envs } from './config/envs';
import { AppRoutes } from "./presentation/routes";
import { PrismaClient } from "@prisma/client";

(() => {
    main()
})()

async function main() {
    const prisma = new PrismaClient()
    await prisma.$connect();
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    }).star()
    await prisma.$disconnect();
}