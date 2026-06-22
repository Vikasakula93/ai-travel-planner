"use client";

import { useEffect, useState } from "react";
import API from "@/utils/api";

interface Trip {
  _id: string;
  destination: string;
  days: number;
  budgetType: string;
  interests: string[];

  itinerary?: string;
  estimatedBudget?: string;
}

export default function DashboardPage() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budgetType, setBudgetType] = useState("Medium");
  const [interests, setInterests] = useState("");

  const [trips, setTrips] = useState<Trip[]>([]);

  const fetchTrips = async () => {
    try {
        const res = await API.get("/trips");

        setTrips(res.data.trips || []);
    } catch (error) {
        console.log(error);
        setTrips([]);
        }
    };

  useEffect(() => {
    fetchTrips();
  }, []);

  const createTrip = async () => {
    try {
      await API.post("/trips", {
        destination,
        days: Number(days),
        budgetType,
        interests: interests.split(",").map((item) => item.trim()),
      });

      alert("Trip Created Successfully ✈️");

      setDestination("");
      setDays("");
      setInterests("");

      fetchTrips();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed");
    }
  };

  const generateAITrip = async (tripId: string) => {
    try {
        const res = await API.post(`/trips/${tripId}/generate`);

        alert("AI Trip Generated Successfully 🚀");

        console.log(res.data);

        fetchTrips();
    } catch (error: any) {
        alert(error?.response?.data?.message || "AI Generation Failed");
    }
  };


  const deleteTrip = async (tripId: string) => {
    try {
        await API.delete(`/trips/${tripId}`);

        alert("Trip deleted successfully");

        fetchTrips();
    } catch (error: any) {
        alert(
            error?.response?.data?.message ||
            "Failed to delete trip"
        );
        }
    };

  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-slate-50 to-blue-100">
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">
        AI Travel Planner ✈️
      </h1>

      {/* Create Trip Form */}

      <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Create Trip
        </h2>

        <input
          className="w-full p-3 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <input
          type="number"
          className="w-full p-3 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        <select
          className="w-full p-3 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={budgetType}
          onChange={(e) => setBudgetType(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          className="w-full p-3 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Food, Culture, Shopping"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />

        <button
          onClick={createTrip}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Create Trip
        </button>
      </div>
    </div>

      {/* Trips List */}

<div>
  <h2 className="text-2xl font-semibold mb-4">
    My Trips
  </h2>

  {trips.length === 0 ? (
    <p>No trips found</p>
  ) : (
    trips.map((trip) => (
      <div
        key={trip._id}
        className="bg-white rounded-2xl shadow-lg p-6 mb-5 border border-gray-100 hover:shadow-xl transition-all duration-300"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              ✈️ {trip.destination}
            </h3>

            <p className="text-gray-600 mt-2">
              📅 {trip.days} Days
            </p>

            <p className="text-gray-600">
              💰 Budget: {trip.budgetType}
            </p>

            <p className="text-gray-600 mt-2">
              🎯 {trip.interests.join(", ")}
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => generateAITrip(trip._id)}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition"
          >
            Generate AI
          </button>

          <button
            onClick={() => deleteTrip(trip._id)}
            className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold transition"
          >
            Delete
          </button>
        </div>

        {trip.itinerary && (
          <div className="mt-5 bg-gray-50 rounded-xl p-4">
            <h4 className="font-bold text-lg mb-2">
              AI Itinerary
            </h4>

            <pre className="whitespace-pre-wrap text-gray-700">
              {trip.itinerary}
            </pre>

            <p className="mt-3 font-semibold text-emerald-700">
              Estimated Budget: {trip.estimatedBudget}
            </p>
          </div>
        )}
      </div>
    ))
  )}
</div>
</div>   // closes main page container
);
}        // closes component