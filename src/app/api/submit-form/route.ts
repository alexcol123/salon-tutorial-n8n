// app/api/submit-form/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();

    // Basic validation
    if (
      !body.name ||
      !body.email ||
      !body.phone ||
      !body.service ||
      !body.budget
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Your n8n webhook URL for form submissions
    const n8nWebhookUrl = process.env.N8N_FORM_WEBHOOK_URL;

    if (!n8nWebhookUrl) {
      return NextResponse.json(
        { error: "N8N webhook URL is not configured" },
        { status: 500 }
      );
    }

    // Format data for n8n if needed
    const formattedData = {
      ...body,
      // Add additional metadata
      timestamp: new Date().toISOString(),
      source: "website_form",
      formType: "information_request",
    };

    // Send the data to n8n
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    if (!n8nResponse.ok) {
      throw new Error(`N8N responded with status: ${n8nResponse.status}`);
    }

    // Parse the response from n8n (if needed)
    const responseData = await n8nResponse.json();
    console.log("N8N form submission response:", responseData);

    // Return success response to the client
    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (error: unknown) {
    // Handle errors
    console.error("Error processing form submission:", error);
    let errorMessage = "Failed to process form submission";
    let errorDetails = "An unknown error occurred.";

    if (error instanceof Error) {
      errorMessage = "Failed to process form submission";
      errorDetails = error.message;
    } else {
      errorMessage = "An unexpected error occurred";
      errorDetails = String(error);
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: errorDetails,
      },
      { status: 500 }
    );
  }
}
