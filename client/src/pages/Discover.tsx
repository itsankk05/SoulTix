import React from "react";
import { HoverEffect } from "../components/ui/card-hover-effect";
import concert from "../images/concert.jpg";
import alan from "../images/nft3.webp";
import art1 from "../images/art1.jpg";
import art2 from "../images/art2.jpg";
import { Link } from "react-router-dom";
import SwapTextCard from "../components/animata/card/swap-text-card";
export default function Discover() {
  const events = [
    {
      id: "1",
      name: "World Of Spheres",
      artist: "Coldplay",
      description:
        "Coldplay are considered one of the most influential groups of the 21st century. According to Steve Baltin from Forbes, they have become the standard for the contemporary alternative scene",
      image: concert,
      bookingstartDate: "2024-04-01T10:00:00Z",
      bookingendDate: "2024-06-15T23:59:59Z",
      eventDate: "2024-06-20T19:30:00Z",
      doors: "2024-06-20T18:00:00Z",
      duration: "180", // in minutes

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
      name: "Different World",
      artist: "Alan Walker",
      description:
        "Coldplay are considered one of the most influential groups of the 21st century. According to Steve Baltin from Forbes, they have become the standard for the contemporary alternative scene",

      image: alan,
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
    {
      id: "3",
      name: "Mathematics Tour",
      description:
        "Coldplay are considered one of the most influential groups of the 21st century. According to Steve Baltin from Forbes, they have become the standard for the contemporary alternative scene",

      artist: "Ed Sheeran",
      image: art1,
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
    {
      id: "4",
      name: "Eminem",
      description:
        "Coldplay are considered one of the most influential groups of the 21st century. According to Steve Baltin from Forbes, they have become the standard for the contemporary alternative scene",

      artist: "Taylor Swift",
      image: art2,
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

  return (
    <div className="flex flex-col items-center justify-center p-20 ">
      <div className="text-4xl text-white">Find Your Favs Here</div>
      {/* <SwapTextCard
        finalText="Animata is developed by a passionate team of developers who love animations. We study the best interactions from top websites and bring them to you, saving you hours of development time."
        initialText="Hand-crafted ✍️ interaction animation on internet"
        backgroundImage={item.image}
      /> */}
      <div className="grid max-w-4xl text-white lg:max-w-6xl grid-cols-1 mx-auto mt-8 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12 lg:mt-20 sm:text-left">
        {events.map((item, index) => (
          <Link key={index} to={`/event/${item.id}`}>
            <SwapTextCard
              title={item.artist}
              finalText={item.description}
              initialText={item.name}
              backgroundImage={item.image}
            />
            {/* <div
              className="relative overflow-hidden bg-white shadow-md rounded-xl p-9 transition duration-300 ease-in-out hover:bg-white-300 hover:scale-110"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "300px",
                width: "300px",
              }}
            >
              <div className="p-9 bg-opacity-75"></div>
              <p className="opacity-0 hover:opacity-100 duration-300 absolute inset-0  flex justify-center items-center">
                {item.name}
              </p>
            </div> */}
          </Link>
        ))}
      </div>
    </div>
  );
}
