import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "POST") {
        // Insert Panel ke Unit tertentu
        const { unitId, panel_id, dust, voltage, current, power, pump_status, wiper_status } = req.body;

        const panel = await prisma.panel.create({
            data: {
                panel_id,
                dust,
                voltage,
                current,
                power,
                pump_status,
                wiper_status,
                unit: { connect: { id: unitId } },
            },
        });

        return res.status(201).json(panel);
    }

    if (req.method === "PUT") {
        // Update Panel
        const { id, dust, voltage, current, power, pump_status, wiper_status } = req.body;

        const panel = await prisma.panel.update({
            where: { id },
            data: { dust, voltage, current, power, pump_status, wiper_status },
        });

        return res.status(200).json(panel);
    }

    return res.status(405).json({ message: "Method not allowed" });
}
