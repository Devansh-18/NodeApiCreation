import express from "express";
import {
    createEvent,
    deleteEvent,
    getEvents,
    updateEvent
} from "../controllers/eventController.js";

import { upload } from "../config/upload.js";

const router = express.Router();

router.get("/events", getEvents);
router.post("/events", upload.single("files[image]"), createEvent);
router.put("/events/:id", upload.single("files[image]"), updateEvent);
router.delete("/events/:id", deleteEvent);

export default router;
