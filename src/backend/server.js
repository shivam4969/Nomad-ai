import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
    res.json({
        message: "Nomad AI backend is running!"
    });
});

app.post("/api/itinerary", async (req, res) => {

    try {
        const {
            destination,
            duration,
            travelStyle,
            tripStyle,
            interests
        } = req.body;

        const prompt = `
        Create a neat and clean day by day travel itinerary with some time for buffer. Keep it not consize with not too berif explanations

        Destination: ${destination}
        Duration: ${duration}
        Travel style: ${travelStyle}
        Trip style: ${tripStyle}
        Interests: ${interests.join(", ")}

        Give useful recommendations for this traveler ideal to his travel style and number of days.
        `;
       const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash",
        input: prompt,

        response_format: {
            type: "text",
            mime_type: "application/json",
            schema: {
                type: "object",
                properties: {
                    destination: {
                        type: "string"
                    },
                    days: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                day: {
                                    type: "integer"
                                },
                                title: {
                                    type: "string"
                                },
                                activities: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            time: {
                                                type: "string"
                                            },
                                            name: {
                                                type: "string"
                                            },
                                            description: {
                                                type: "string"
                                            },
                                            category: {
                                                type: "string"
                                            }
                                        },
                                        required: [
                                            "time",
                                            "name",
                                            "description",
                                            "category"
                                        ]
                                    }
                                }
                            },
                            required: [
                                "day",
                                "title",
                                "activities"
                            ]
                        }
                    }
                },
                required: [
                    "destination",
                    "days"
                ]
            }
        }
        });
        const itinerary = JSON.parse(interaction.output_text);

        res.json(itinerary);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error: "Failed to generate itinerary"
            });
        }
    });

app.listen(3000, () => {
    console.log("Nomad AI backend running on http://localhost:3000");
});