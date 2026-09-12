"use client";

import { useState } from "react";

export default function TestPage() {
    const [result, setResult] = useState(null);

    async function testBackend() {
        const tripData = {
            destination: "Tokyo, Japan",
            duration: "3 Days",
            travelStyle: "Adventurous",
            tripStyle: "Solo",
            interests: [
                "Food & Drink",
                "Culture & History",
                "Nightlife"
            ]
        };

        const response = await fetch(
            "http://localhost:3000/api/itinerary",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tripData)
            }
        );

        const data = await response.json();

        console.log("Response from backend:", data);

        setResult(data);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-bold">
                Nomad AI Backend Test
            </h1>

            <button
                onClick={testBackend}
                className="px-6 py-3 rounded-lg bg-black text-white"
            >
                Test Backend
            </button>

            {result && (
                <pre className="max-w-4xl whitespace-pre-wrap">
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </div>
    );
}