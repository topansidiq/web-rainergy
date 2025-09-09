import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "./generated/prisma/index.js";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());

// === USERS ===
app.post("/users", async (req, res) => {
    const { name } = req.body;
    const user = await prisma.user.create({ data: { name } });
    res.json(user);
});

app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany({ include: { units: true } });
    res.json(users);
});

// === UNITS ===
app.post("/units", async (req, res) => {
    const { userId, dust, voltage, current, power } = req.body;
    const unit = await prisma.unit.create({
        data: {
            dust,
            voltage,
            current,
            power,
            users: { connect: { id: userId } },
        },
    });
    res.json(unit);
});

app.get("/units", async (req, res) => {
    const units = await prisma.unit.findMany({ include: { panels: true } });
    res.json(units);
});

app.put("/units/:id", async (req, res) => {
    const { id } = req.params;
    const { dust, voltage, current, power } = req.body;
    const unit = await prisma.unit.update({
        where: { id: Number(id) },
        data: { dust, voltage, current, power },
    });
    res.json(unit);
});

// === PANELS ===
app.post("/panels", async (req, res) => {
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
    res.json(panel);
});

app.put("/panels/:id", async (req, res) => {
    const { id } = req.params;
    const { dust, voltage, current, power, pump_status, wiper_status } = req.body;
    const panel = await prisma.panel.update({
        where: { id: Number(id) },
        data: { dust, voltage, current, power, pump_status, wiper_status },
    });
    res.json(panel);
});
