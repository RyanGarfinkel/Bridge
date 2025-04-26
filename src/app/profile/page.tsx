'use client';

import { Button } from "@/components/ui/button";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default function UserProfile() {
  const { user, isLoading } = useUser();

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
      >
        <p>Loading...</p>
      </div>
    );

  if (user)
    return (
      <div
        style={{
            display: "flex",
            justifyContent: "center", // Centers horizontally
            alignItems: "center", // Centers vertically
            height: "100vh", // Full viewport height
            width: "100vw", // Full viewport width
            fontFamily: "sans-serif",
            textAlign: "center",
            flexDirection: "column", // Stack text and buttons vertically
            gap: "20px", // Add spacing between elements
            margin: 0, // Ensure no margin
            padding: 0, // Ensure no padding
            boxSizing: "border-box", // Consistent box model
        }}
      >
        {/* Profile Picture */}
        <img
          src={user.picture}
          alt={`${user.name}'s profile`}
          style={{
            borderRadius: "50%",
            width: "150px",
            height: "150px",
            objectFit: "cover",
          }}
        />

        {/* User Title */}
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Hello, {user.name}.
        </h1>

        {/* Survey Button */}
        <Button variant="outline" asChild>
          <Link href="/survey">Complete Survey</Link>
        </Button>

      </div>
    );

  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      flexDirection: "column",
      textAlign: "center",
      fontFamily: "sans-serif",
      gap: "20px",
      padding: "20px",
      boxSizing: "border-box",
    }}
  >
    <h1 style={{ fontSize: "3rem", margin: 0 }}>Welcome to Bridgly 🌉</h1>
    <p style={{ fontSize: "1.5rem", maxWidth: "600px" }}>
    Our AI-powered college readiness training program is designed to help incoming university students transition smoothly into academic life, with lesson plans custom tailored to their interests and study style.
    </p>
    <Button variant="default" asChild>
      <a href="/auth/login" style={{ fontSize: "1.25rem", padding: "10px 20px" }}>
        Log In
      </a>
    </Button>
  </div>
  );
}