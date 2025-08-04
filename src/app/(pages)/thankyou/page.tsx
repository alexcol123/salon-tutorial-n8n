"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Home, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ThankYou() {
  // Auto-redirect to home after 10 seconds
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.href = "/";
    }, 10000);

    // Clear timeout if the component unmounts
    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-white p-4 ">
      <Card className="max-w-md w-full border-pink-100 shadow-lg overflow-hidden py-0">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 flex justify-center">
          <CheckCircle className="text-white h-16 w-16" />
        </div>
        
        <CardContent className="p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h1>
          <p className="text-gray-600 mb-6">
            We&apos;ve received your information request and a stylist will be in touch with you shortly.
          </p>
          
          <div className="space-y-3">
            <Button asChild className="w-full bg-pink-600 hover:bg-pink-700">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full border-pink-200 text-pink-600 hover:bg-pink-50">
              <Link href="/book-appointment">
                <Calendar className="mr-2 h-4 w-4" />
                Book an Appointment
              </Link>
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            You will be redirected to the homepage in 10 seconds...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}