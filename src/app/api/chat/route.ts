// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Your n8n webhook URL
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!n8nWebhookUrl) {
      return NextResponse.json(
        { error: "N8N webhook URL is not configured" },
        { status: 500 }
      );
    }

    // Send the message to n8n
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        timestamp: new Date().toISOString(),
        // Add any additional data you want to send to n8n
        // Note: cookies are accessed differently in App Router
        userId: req.cookies.get("userId")?.value || "anonymous",
        chatId: "chat-12",
      }),
    });

    if (!n8nResponse.ok) {
      throw new Error(`N8N responded with status: ${n8nResponse.status}`);
    }

    // Parse the response from n8n
    const responseData = await n8nResponse.json();

    console.log("N8N response:", responseData);

    // Return the response to the client
    return NextResponse.json(responseData);
  } catch (error: unknown) {
    //Changed to unknown
    let errorMessage = "Failed to process message";
    let errorDetails = "An unknown error occurred."; //Default

    if (error instanceof Error) {
      //Type narrowing
      errorMessage = "Failed to process message";
      errorDetails = error.message;
    } else {
      // Handle cases where the error is not an Error object (rare, but possible)
      errorMessage = "An unexpected error occurred";
      errorDetails = String(error); // Convert to string for logging/display
    }

    console.error("Error processing chat message:", error);
    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails,
      },
      { status: 500 }
    );
  }
}
