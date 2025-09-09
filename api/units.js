import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "POST") {
        // Insert Unit baru untuk User tertentu
        const { userId, dust, voltage, current, power } = req.body;

        const unit = await prisma.unit.create({
            data: {
                dust,
                voltage,
                current,
                power,
                users: {
                    connect: { id: userId },
                },
            },
        });

        return res.status(201).json(unit);
    }

    if (req.method === "PUT") {
        // Update Unit
        const { id, dust, voltage, current, power } = req.body;

        const unit = await prisma.unit.update({
            where: { id },
            data: { dust, voltage, current, power },
        });

        return res.status(200).json(unit);
    }

    return res.status(405).json({ message: "Method not allowed" });
}
