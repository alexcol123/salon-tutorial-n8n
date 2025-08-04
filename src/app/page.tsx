"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MessageSquare,
  Scissors,
  Heart,
  Star,
  Phone,
} from "lucide-react";

export default function Home() {
  const services = [
    {
      id: 1,
      name: "Haircut & Styling",
      description: "Precision cuts and styling for all hair types",
      image: "/salonImages/a3.jpeg",
      rate: "$45+",
    },
    {
      id: 2,
      name: "Hair Coloring",
      description: "From subtle highlights to bold transformations",
      image: "/salonImages/a6.jpeg",
      rate: "$80+",
    },
    {
      id: 3,
      name: "Treatments & Masks",
      description: "Nourishing treatments for damaged or dry hair",
      image: "/salonImages/a5.jpeg",
      rate: "$30+",
    },
    {
      id: 4,
      name: "Blowouts",
      description: "Professional blowdry and styling for any occasion",
      image: "/salonImages/a2.jpeg",
      rate: "$35+",
    },
    {
      id: 5,
      name: "Bridal Services",
      description: "Special occasion styling for your perfect day",
      image: "/salonImages/a8.jpeg",
      rate: "Contact Us",
    },
    {
      id: 6,
      name: "Men's Haircuts",
      description: "Stylish haircuts designed specifically for men",
      image: "/salonImages/a9.jpeg",
      rate: "$30+",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Phone Call Button - Fixed position */}
      <a
        href="tel:555-555-5555"
        className="absolute top-6 right-6 z-50 bg-pink-600 hover:bg-pink-700 text-white rounded-md p-3 shadow-lg transition-transform hover:scale-105"
        aria-label="Call us"
      >
        <div className="flex gap-4 ">
          <div>Call Now </div>
          <Phone size={24} />
        </div>
      </a>

      {/* Chat Widget Button - Fixed position */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-pink-600 hover:bg-pink-700 text-white rounded-full p-3 shadow-lg transition-transform hover:scale-105"
        aria-label="Chat with us"
        onClick={() => alert("Chat functionality would open here")}
      >
        <MessageSquare size={24} />
      </button>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/salonImages/a1.jpeg"
            alt="Salon background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/70 to-purple-600/70 z-10"></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg animate-fadeInDown">
              Elegance Hair Studio
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md animate-fadeIn">
              Where beauty meets expertise for the modern woman
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-white text-pink-600 hover:bg-gray-100 text-base px-6 py-5 transition-transform hover:scale-105">
                <Calendar className="mr-2 h-4 w-4" />
                <Link href="/book-appointment">Book Appointment</Link>
              </Button>
              <Button
                variant="outline"
                className="border-white text-gray-600 hover:bg-white/30 hover:text-white text-base px-6 py-5 transition-transform hover:scale-105"
              >
                <Link href="/form">Request More Info</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Premium Services
            </h2>
            <div className="w-24 h-1 bg-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the pinnacle of hair care with our professional
              stylists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="h-52 relative">
                  <Image
                    src={service.image}
                    alt={`${service.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    {service.id === 1 && (
                      <Scissors className="w-4 h-4 mr-2 text-pink-500" />
                    )}
                    {service.id === 5 && (
                      <Heart className="w-4 h-4 mr-2 text-pink-500" />
                    )}
                    {service.id !== 1 && service.id !== 5 && (
                      <Star className="w-4 h-4 mr-2 text-pink-500" />
                    )}
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="bg-pink-50 p-3 rounded-md text-center">
                    <p className="text-sm text-gray-600">Starting at</p>
                    <p className="text-lg font-medium text-pink-600">
                      {service.rate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for a New Look?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Our team of expert stylists is ready to help you achieve the look
            you&apos;ve always wanted.
          </p>

          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Have questions about our services? Chat directly with our stylists
            to get professional advice before booking your appointment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="outline"
              className="flex items-center gap-2 border-pink-600 text-pink-700 hover:bg-pink-100 text-base px-6 py-5 transition-transform hover:scale-105"
            >
              <Link href="/chat">
                <MessageSquare size={16} />
                <span>Chat with a Stylist</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Elegance Hair Studio</h2>
              <p className="text-gray-400">Beauty is our passion</p>
              <p className="text-gray-400 mt-2">123 Beauty Lane, Styletown</p>
              <p className="text-gray-400">(555) 123-4567</p>
            </div>
            <div className="flex gap-6">
              <Link
                href="/book-appointment"
                className="text-white hover:text-pink-300 transition-colors"
              >
                Book Appointment
              </Link>
              <Link
                href="/form"
                className="text-white hover:text-pink-300 transition-colors"
              >
                Request Info
              </Link>
              <Link
                href="#"
                className="text-white hover:text-pink-300 transition-colors"
              >
                Chat Now
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Elegance Hair Studio. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
