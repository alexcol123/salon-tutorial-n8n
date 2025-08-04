"use client";

import React, { useState } from "react";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

export default function RequestInfoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  // console.log(formData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [response] = useState({
    EmailSentTo: "emailSent",
  });

  const handleSelect = (value: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      budget: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Connect to your n8n workflow via an API route
      const response: Response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Example: set the response as a stringified value, or update your state shape as needed
      const data = await response.body
      console.log("data - ", data);

      // setresponse({
      //   EmailSentTo: data.EmailSentTo || "test123",
      // });

      // Redirect to thank you page or home
      // router.push('/thankyou');
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
      alert(
        "There was a problem submitting your request. Please try again or call us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4">
      <div className="max-w-md mx-auto">
        <Link
          href="/"
          className="flex items-center text-pink-600 hover:text-pink-800 mb-4 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        <Card className="border-pink-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Request More Information</CardTitle>
            <CardDescription className="text-pink-100">
              Tell us what you&apos;re looking for, and we&apos;ll get back to
              you soon
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border-pink-200 focus-visible:ring-pink-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-pink-200 focus-visible:ring-pink-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border-pink-200 focus-visible:ring-pink-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service" className="text-gray-700">
                  Service Interested In
                </Label>
                <Input
                  id="service"
                  name="service"
                  placeholder="e.g., Hair coloring, styling, treatment"
                  value={formData.service}
                  onChange={handleChange}
                  className="border-pink-200 focus-visible:ring-pink-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="text-gray-700">
                  Budget Range
                </Label>
                <Select
                  value={formData.budget}
                  onValueChange={handleSelect}
                  required
                >
                  <SelectTrigger className="w-full border-pink-200 focus-visible:ring-pink-500">
                    <SelectValue placeholder="Select your budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under $100">Under $100</SelectItem>
                    <SelectItem value="$100-$200">$100 - $200</SelectItem>
                    <SelectItem value="$200+">$200+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-700">
                  Additional Information (Optional)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about what you're looking for..."
                  value={formData.message}
                  onChange={handleChange}
                  className="border-pink-200 focus-visible:ring-pink-500 min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t pt-4 text-sm text-gray-500">
            <p>
              Your personal information is protected by our{" "}
              <Link
                href="/privacy-policy"
                className="text-pink-600 hover:underline"
              >
                privacy policy
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className="bg-gray-50">
          <div className="mt-20">Admin Dasboard</div>
          {JSON.stringify(response)}

          <div>
            <Table className="border  bg-green-200">
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
