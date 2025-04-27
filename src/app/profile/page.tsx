'use client';

import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataProvider";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default function UserProfile() {
  const { user, isLoading } = useData();
  const { user: auth0User } = useUser();

  if (isLoading)
    return (
      <div className='flex justify-center items-center h-screen w-screen font-sans text-center'>
        <h1 style={{ fontSize: '3rem' }}>Loading...</h1>
      </div>
    );

  if (user)
    console.log(user);

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
          src={auth0User?.picture || "/default-profile.png"}
          alt={`${user.firstname}'s profile`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-profile.png";
          }}
          style={{
            borderRadius: "50%",
            width: "150px",
            height: "150px",
            objectFit: "cover",
          }}
        />

        {/* User Title */}
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Hello, {user.firstname}.
        </h1>

        {/* Survey Button */}
        <Button variant="outline" asChild>
          <Link href="/survey">
            {user.hasCompletedSurvey ? "Redo Survey" : "Complete Survey"}
          </Link>
        </Button>

      </div>
    );

  return (
    <div className='flex justify-center items-center h-screen w-screen font-sans text-center'>
        <h1 style={{ fontSize: '3rem' }}>Loading...</h1>
      </div>
  );
}