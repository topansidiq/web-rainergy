import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "POST") {
        // Insert User baru
        const { name } = req.body;

        const user = await prisma.user.create({
            data: { name },
        });

        return res.status(201).json(user);
    }

    if (req.method === "GET") {
        // Ambil semua user
        const users = await prisma.user.findMany({
            include: { units: true },
        });

        return res.status(200).json(users);
    }

    return res.status(405).json({ message: "Method not allowed" });
}
