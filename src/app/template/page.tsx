'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Correct import for client components

export default function CourseDescription() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "20px",
        fontFamily: "sans-serif",
        textAlign: "center",
        gap: "20px",
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* Back Button */}
      <div
        style={{
          alignSelf: "flex-start",
          marginBottom: "5px", // Add spacing below the button
        }}
      >
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      {/* Course Title */}
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
        UNIT TITLE
      </h1>

      {/* Curriculum Section */}
      <div style={{ textAlign: "left", width: "100%" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Curriculum:</h2>
        <ul style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
          <li>LESSON ONE</li>
          <li>LESSON TWO</li>
          <li>LESSON THREE</li>
          <li>LESSON FOUR</li>
          <li>LESSON FIVE</li>
        </ul>
      </div>

      {/* Start Lesson Buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        <Button variant="outline">Start the next lesson</Button>
      </div>
    </div>
  );
}