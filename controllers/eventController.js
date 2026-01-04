import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

// Creates an event and returns the Id of the event i.e. created
export const createEvent = async (req, res) => {
    try {
        const database = await db();

        const event = {
            ...req.body,
            files: req.file ? req.file.path : null,
            createdAt: new Date()
        };

        const result = await database.collection("events").insertOne(event);

        res.json({
            success: true,
            message: "Event created successfully",
            data: { id: result.insertedId },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create event",
            error: error.message
        });
    }
};

// Gets an event by its unique id
export const getEventById = async (req, res) => {
    try {
        const database = await db();

        const event = await database
            .collection("events")
            .findOne({ _id: new ObjectId(req.params.id) });

        res.json({
            success: true,
            message: "Event fetched successfully",
            data: event,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch event",
            error: error.message
        });
    }
};

// Gets an event by its recency & paginate results by page number and limit of events per page
export const getLatestEvents = async (req, res) => {
    try {
        const { limit = 5, page = 1 } = req.query;
        const database = await db();

        const events = await database
            .collection("events")
            .find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * Number(limit))
            .limit(Number(limit))
            .toArray();

        res.json({
            success: true,
            message: "Latest events fetched successfully",
            data: events,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch latest events",
            error: error.message
        });
    }
};

// update 
export const updateEvent = async (req, res) => {
    try {
        const database = await db();

        await database.collection("events").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { ...req.body, files: req.file?.path } }
        );

        res.json({
            success: true,
            message: "Event updated",
            data: { message: "Event updated" },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update event",
            error: error.message
        });
    }
};

// Deletes an event based on its Unique Id
export const deleteEvent = async (req, res) => {
    try {
        const database = await db();

        await database
            .collection("events")
            .deleteOne({ _id: new ObjectId(req.params.id) });

        res.json({
            success: true,
            message: "Event deleted",
            data: { message: "Event deleted" },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete event",
            error: error.message
        });
    }
};
