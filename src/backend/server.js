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


/* ---------------- HOME ROUTE ---------------- */

app.get("/", (req, res) => {
    res.json({
        message: "Nomad AI backend is running!"
    });
});


/* ---------------- ITINERARY ROUTE ---------------- */

app.post("/api/itinerary", async (req, res) => {

    try {

        const {
            destination,
            startDate,
            endDate,
            duration,
            travelStyle,
            tripStyle,
            interests,
            budget
        } = req.body;


        /* ---------------- GEMINI PROMPT ---------------- */

        const prompt = `
You are a travel planning AI for Nomad AI.

Create a detailed but clean day-by-day travel itinerary for the traveler below.

TRIP INFORMATION:

Destination: ${destination}
Start date: ${startDate}
End date: ${endDate}
Duration: ${duration} days

Travel style: ${travelStyle}
Trip style: ${tripStyle}
Interests: ${interests.join(", ")}
Daily budget: $${budget}


ITINERARY REQUIREMENTS:

1. Create a realistic itinerary for every day of the trip.

2. Include reasonable buffer time between activities.

3. Consider travel time between locations so the itinerary is realistic.

4. Recommend experiences based on the traveler's interests,
   travel style, and trip style.

5. Keep the estimated spending slightly below the user's
   daily budget.

6. Include relevant emojis where appropriate.

7. Do not overcrowd the itinerary. Give the traveler enough
   time to actually enjoy each experience.


SPECIAL EVENTS:

Find notable events, festivals, concerts, exhibitions,
sporting events, cultural events, seasonal events, or other
special events that take place during the exact travel dates.

Only include events that occur between:

${startDate}

and

${endDate}

Do NOT invent events.

If there are no notable events during the travel dates,
return an empty specialEvents array.

Keep special events separate from the daily itinerary.


BUDGET:

Estimate the approximate cost of the trip.

Keep the daily average slightly below the user's budget.

Include practical money-saving suggestions.

The estimated total should be based on realistic expenses
for the recommended activities, transportation, and food.


OUTPUT:

Return ONLY the requested JSON structure.
Do not include markdown.
Do not include explanations outside the JSON.
`;


        /* ---------------- GEMINI REQUEST ---------------- */

        const interaction = await ai.interactions.create({

            model: "gemini-3.5-flash",

            input: prompt,

            response_format: {

                type: "text",

                mime_type: "application/json",

                schema: {

                    type: "object",

                    properties: {

                        /* -------- BASIC TRIP INFO -------- */

                        destination: {
                            type: "string"
                        },

                        startDate: {
                            type: "string"
                        },

                        endDate: {
                            type: "string"
                        },

                        duration: {
                            type: "integer"
                        },


                        /* -------- DAILY ITINERARY -------- */

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

                        },


                        /* -------- SPECIAL EVENTS -------- */

                        specialEvents: {

                            type: "array",

                            items: {

                                type: "object",

                                properties: {

                                    date: {
                                        type: "string"
                                    },

                                    name: {
                                        type: "string"
                                    },

                                    location: {
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
                                    "date",
                                    "name",
                                    "location",
                                    "description",
                                    "category"
                                ]

                            }

                        },


                        /* -------- BUDGET SUMMARY -------- */

                        summary: {

                            type: "object",

                            properties: {

                                estimatedTotal: {
                                    type: "number"
                                },

                                dailyAverage: {
                                    type: "number"
                                },

                                budget: {
                                    type: "number"
                                },

                                moneySavingTips: {

                                    type: "array",

                                    items: {
                                        type: "string"
                                    }

                                }

                            },

                            required: [
                                "estimatedTotal",
                                "dailyAverage",
                                "budget",
                                "moneySavingTips"
                            ]

                        }

                    },

                    required: [
                        "destination",
                        "startDate",
                        "endDate",
                        "duration",
                        "days",
                        "specialEvents",
                        "summary"
                    ]

                }

            }

        });


        /* ---------------- PARSE RESPONSE ---------------- */

        const itinerary = JSON.parse(
            interaction.output_text
        );


        console.log("GENERATED ITINERARY:");
        console.log(itinerary);


        /* ---------------- SEND TO FRONTEND ---------------- */

        res.json(itinerary);


    } catch (error) {

        console.error("ITINERARY ERROR:", error);

        res.status(500).json({
            error: "Failed to generate itinerary"
        });

    }

});


/* ---------------- TEST TRIP ROUTE ---------------- */

app.post("/api/trips", (req, res) => {

    console.log("TRIP DATA FROM FRONTEND:");
    console.log(req.body);

    res.json({
        message: "Trip data received!",
        trip: req.body
    });

});


/* ---------------- START SERVER ---------------- */

app.listen(3000, () => {

    console.log(
        "Nomad AI backend running on http://localhost:3000"
    );

});