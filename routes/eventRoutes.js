import express from "express";
import {
    createEvent,
    deleteEvent,
    getEventById,
    getLatestEvents,
    updateEvent
} from "../controllers/eventController.js";

import { upload } from "../config/upload.js";

const router = express.Router();

router.get("/events/:id", getEventById);
router.get("/events", getLatestEvents);
router.post("/events", upload.single("image"), createEvent);
router.put("/events/:id", upload.single("image"), updateEvent);
router.delete("/events/:id", deleteEvent);

export default router;
