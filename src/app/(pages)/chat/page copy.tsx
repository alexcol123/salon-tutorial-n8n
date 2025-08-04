// This directive declares that this code should run on the client-side.
// In Next.js, it marks the boundary between Server Components and Client Components.
"use client";

// Import necessary components and libraries from React and other files.
import React, { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft } from "lucide-react"; // Icons
import { Button } from "@/components/ui/button"; // Custom button component
import { Input } from "@/components/ui/input"; // Custom input component
import { ScrollArea } from "@/components/ui/scroll-area"; // Custom scroll area component
import { Avatar } from "@/components/ui/avatar"; // Custom avatar component
import { Card } from "@/components/ui/card"; // Custom card component
import Link from "next/link"; // For client-side navigation
import { FaScissors, FaRegFaceGrin } from "react-icons/fa6"; // Icons from react-icons

// Define the main component for the chat page.
const ChatPage = () => {
  // 'useState' hook to manage the array of messages in the chat.
  // It is initialized with a welcome message from the bot.
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to Elegance Hair Studio. How can I help you today?",
      sender: "bot",
    },
  ]);
  
  // 'useState' hook to manage the value of the input field.
  const [inputValue, setInputValue] = useState("");
  
  // 'useState' hook to manage the loading state while waiting for a response.
  const [isLoading, setIsLoading] = useState(false);

  // 'useRef' hook to create a reference to the end of the messages container.
  // This is used to scroll to the bottom automatically.
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 'useEffect' hook to scroll to the bottom of the chat whenever the 'messages' array is updated.
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to scroll the message area to the bottom smoothly.
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Asynchronous function to handle sending a message.
  const handleSendMessage = async () => {
    // Check if the input value is not empty after trimming whitespace.
    if (inputValue.trim()) {
      setIsLoading(true); // Set loading state to true.

      // Create a new message object for the user's message.
      const newUserMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user",
      };

      // Add the user's message to the messages array.
      setMessages([...messages, newUserMessage]);
      const userInput = inputValue;
      setInputValue(""); // Clear the input field.

      try {
        // Send the user's message to the backend API endpoint.
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userInput }),
        });

        // If the response is not successful, throw an error.
        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        // Parse the JSON response from the API.
        const data = await response.json();

        // Extract the text response from the data, with a fallback message.
        const textResponse =
          data[0]?.output ||
          "I'll have one of our stylists get back to you soon about this!";

        // Create a new message object for the bot's response.
        const newBotMessage = {
          id: messages.length + 2,
          text: textResponse,
          sender: "bot",
        };

        // Add the bot's response to the messages array.
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      } catch (error) {
        // Log any errors to the console.
        console.error("Error sending message:", error);

        // Create an error message to display to the user.
        const errorMessage = {
          id: messages.length + 2,
          text: "Sorry, there was an error processing your message. Please try again or call us directly.",
          sender: "bot",
        };

        // Add the error message to the messages array.
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        // Set loading state to false after the process is complete.
        setIsLoading(false);
      }
    }
  };

  // Function to handle the 'Enter' key press in the input field.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // The JSX structure of the component to be rendered.
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      {/* Header section of the chat window */}
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

      {/* Main chat area */}
      <Card className="flex-grow overflow-hidden shadow-lg border-pink-100">
        <ScrollArea className="h-full p-4 pb-6">
          {/* Map through the messages array and render each message */}
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
                    {/* Display different icons based on the message sender */}
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
          {/* This invisible div is used as a reference to scroll to the bottom */}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </Card>

      {/* Input area for typing and sending messages */}
      <div className="flex items-center mt-4 gap-2">
        <Input
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow border-pink-200 focus-visible:ring-pink-500"
          disabled={isLoading} // Disable input when loading
        />
        <Button
          onClick={handleSendMessage}
          type="submit"
          disabled={isLoading} // Disable button when loading
          className="bg-pink-600 hover:bg-pink-700 text-white"
        >
          {/* Show a spinner when loading, otherwise show the send icon */}
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Footer with additional information */}
      <div className="text-center text-gray-500 text-xs mt-4">
        Connect with a stylist directly through our chat. For urgent matters,
        please call us at (555) 123-4567.
      </div>
    </div>
  );
};

// Export the component to be used in other parts of the application.
export default ChatPage;