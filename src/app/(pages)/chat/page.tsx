"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FaScissors } from "react-icons/fa6";
import { FaRegFaceGrin } from "react-icons/fa6";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to Elegance Hair Studio. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Create a ref for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Function to scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      setIsLoading(true);

      // Add user message
      const newUserMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user",
      };

      setMessages([...messages, newUserMessage]);
      const userInput = inputValue;
      setInputValue("");

      try {
        // Send message to the n8n workflow via our API route
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userInput }),
        });

        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        const data = await response.json();

        const textResponse =
          data[0]?.output ||
          "I'll have one of our stylists get back to you soon about this!";

        // Add bot response from n8n
        const newBotMessage = {
          id: messages.length + 2,
          text: textResponse,
          sender: "bot",
        };

        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      } catch (error) {
        console.error("Error sending message:", error);

        // Add error message
        const errorMessage = {
          id: messages.length + 2,
          text: "Sorry, there was an error processing your message. Please try again or call us directly.",
          sender: "bot",
        };

        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-4 rounded-t-lg shadow-md">
        <div className="flex items-center">
          <Link href="/" className="mr-3">
            <ArrowLeft
              size={20}
              className="hover:text-pink-200 transition-colors"
            />
          </Link>
          <h1 className="text-xl font-bold">Chat with Elegance Hair Studio</h1>
        </div>
        <p className="text-sm text-pink-100 mt-1">
          Ask us about our services, products, or book an appointment
        </p>
      </div>

      <Card className="flex-grow overflow-hidden shadow-lg border-pink-100">
        <ScrollArea className="h-full p-4 pb-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start max-w-3/4 ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Avatar
                  className={`${
                    message.sender === "user"
                      ? "flex items-center justify-center bg-gray-600"
                      : "flex items-center justify-center bg-purple-600"
                  }`}
                >
                  <div className="flex h-full items-center justify-center text-white font-semibold ">
                    {message.sender === "user" ? <FaRegFaceGrin size={20} /> : <FaScissors size={20} />}
                  </div>
                </Avatar>
                <div
                  className={`p-3 rounded-lg mx-2 ${
                    message.sender === "user"
                      ? "bg-purple-600 text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          {/* This invisible div is used as a reference point for scrolling */}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </Card>

      <div className="flex items-center mt-4 gap-2">
        <Input
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow border-pink-200 focus-visible:ring-pink-500"
          disabled={isLoading}
        />
        <Button
          onClick={handleSendMessage}
          type="submit"
          disabled={isLoading}
          className="bg-pink-600 hover:bg-pink-700 text-white"
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="text-center text-gray-500 text-xs mt-4">
        Connect with a stylist directly through our chat. For urgent matters,
        please call us at (555) 123-4567.
      </div>
    </div>
  );
};

export default ChatPage;