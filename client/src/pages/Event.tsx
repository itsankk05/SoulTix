import React, { useState } from "react";
import concert from "../images/concert.jpg";
import { useParams } from "react-router-dom";
import GaugeChart from "../components/animata/gauge-chart";
import alan from "../images/nft3.webp";

export default function Event() {
  const { id } = useParams();
  const [showGauge, setShowGauge] = useState(false); // Add state for gauge visibility

  const events = [
    {
      id: "1",
      name: "Renaissance World Tour",
      artist: "Coldplay",
      image: concert,
      bookingstartDate: "2024-04-01T10:00:00Z",
      bookingendDate: "2024-06-15T23:59:59Z",
      eventDate: "2024-06-20T19:30:00Z",
      doors: "2024-06-20T18:00:00Z",
      duration: "180", // in minutes
      fanscore: 78,
      venue: "SoFi Stadium",
      pricing: {
        currency: "USD",
        tiers: [
          {
            name: "VIP",
            price: 499.99,
            benefits: ["Meet & Greet", "Early Entry", "Exclusive Merch"],
          },
          {
            name: "Premium",
            price: 299.99,
            benefits: ["Premium Seating", "Dedicated Entrance"],
          },
          {
            name: "General",
            price: 99.99,
            benefits: ["Standard Seating"],
          },
        ],
      },
    },
    {
      id: "2",
      name: "The Eras Tour",
      artist: "Taylor Swift",
      image: alan,
      fanscore: 61,
      bookingstartDate: "2024-05-01T10:00:00Z",
      bookingendDate: "2024-07-15T23:59:59Z",
      status: "upcoming",
      date: "2024-07-25T20:00:00Z",
      doors: "2024-07-25T18:30:00Z",
      duration: "210",
      venue: "MetLife Stadium",
      pricing: {
        currency: "USD",
        tiers: [
          {
            name: "VIP Package",
            price: 899.99,
            benefits: ["VIP Lounge", "Meet & Greet", "Exclusive Merch"],
          },
          {
            name: "Premium",
            price: 399.99,
            benefits: ["Premium Seating", "Early Entry"],
          },
          {
            name: "General",
            price: 149.99,
            benefits: ["Standard Seating"],
          },
        ],
      },
    },
  ];

  const event = events.find((event) => event.id === id);
  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <>
      <div className="p-20 text-white ">
        <h1 className="text-4xl font-bold mb-6 max-w-xl mx-auto text-center p-10">
          {event.name}
        </h1>
        <div className="flex flex-col  lg:flex-row gap-8 items-start">
          {/* Image Section */}
          <img
            src={event.image}
            alt={event.name}
            className="w-full lg:w-1/2 max-w-md rounded-lg shadow-lg"
          />

          {/* Info Section */}
          <div className="flex-1">
            <p className="text-xl mb-3">
              <strong>Artist:</strong> {event.artist}
            </p>
            <p className="text-xl mb-3">
              <strong>Venue:</strong> {event.venue}
            </p>
            <p className="text-xl mb-3">
              <strong>Date:</strong>{" "}
              {new Date(event.eventDate || "").toLocaleString()}
            </p>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Pricing Tiers:</h2>
              <ul className="list-disc list-inside">
                {event.pricing.tiers.map((tier, index) => (
                  <li key={index} className="mb-2 text-lg">
                    <strong>{tier.name}:</strong> ${tier.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <button className="px-12 py-4 mt-8 rounded-full bg-[#1ED760] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#21e065] transition-colors duration-200">
                Buy Now
              </button>
              <button
                className="px-12 py-4 mt-8 ml-4 rounded-full bg-[#1ED760] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#21e065] transition-colors duration-200"
                onClick={() => setShowGauge(true)} // Update state on click
              >
                Check Your FanScore
              </button>
            </div>
          </div>
          {showGauge && ( // Conditionally render the GaugeChart
            <div>
              <GaugeChart
                showValue={true}
                size={300}
                gap={200}
                progress={event.fanscore}
              ></GaugeChart>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
