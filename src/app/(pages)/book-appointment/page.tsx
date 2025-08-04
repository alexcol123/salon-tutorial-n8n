"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

function BookAppointment() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="flex items-center text-pink-600 hover:text-pink-800 mb-6 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        
        <div className="rounded-lg  shadow-lg border border-pink-100 min-h-[1000px]">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Book Your Appointment</h1>
            </div>
            <p className="text-pink-100">
              Select your preferred stylist, service, and time slot below
            </p>
          </div>
          
          <div>
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/alexcol123456/salon-appointmen?primary_color=df00ff"
              style={{ minWidth: "320px", height: "1000px" }}
            ></div>
          </div>
        </div>
        

      </div>
    </div>
  );
}

export default BookAppointment;