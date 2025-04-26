'use client';

import { useState } from "react";

export default function Survey() {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    location: "",
    pronouns: "",
    pets: "",
    university: "",
    studyPlan: "",
    explanationPreference: "",
    studyTools: [] as string[],
    roadblockSolution: "",
    coachStyle: "",
    studyPartner: "",
    studyVoice: "",
    unwind: "",
    hobbies: "",
    holiday: "",
    comfort: "",
    studyBuddy: "",
    favoriteShows: "",
    favoriteGame: "",
    dinnerGuest: "",
    travelDestination: "",
    instantSkill: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...((prev[name as keyof typeof formData] as string[]) || []), value]
          : (prev[name as keyof typeof formData] as string[]).filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

interface FormData {
    // Removed duplicate 'studyTools' property
    name: string;
    birthDate: string;
    location: string;
    pronouns: string;
    pets: string;
    university: string;
    studyPlan: string;
    explanationPreference: string;
    studyTools: string[];
    roadblockSolution: string;
    coachStyle: string;
    studyPartner: string;
    studyVoice: string;
    unwind: string;
    hobbies: string;
    holiday: string;
    comfort: string;
    studyBuddy: string;
    favoriteShows: string;
    favoriteGame: string;
    dinnerGuest: string;
    travelDestination: string;
    instantSkill: string;
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Survey Data:", formData);
    alert("Survey submitted! Thank you!");
};

  return (

    
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
    <h1 style={{ marginTop: "40px", fontSize: "2.5rem", textAlign: "center" }}>Survey</h1>

      {/* Questions */}
      <label>
        What’s your name?
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        />
      </label>

      <label>
        When were you born?
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        />
      </label>

      <label>
        Where are you from?
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        />
      </label>

      <label>
        What are your pronouns?
        <input
          type="text"
          name="pronouns"
          value={formData.pronouns}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        />
      </label>

      <label>
        Do you have any pets? If so, what kind?
        <input
          type="text"
          name="pets"
          value={formData.pets}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        />
      </label>

      <label>
        Which university do you go to?
        <input
          type="text"
          name="university"
          value={formData.university}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        />
      </label>

      <label>
        What are you planning to study in college?
        <input
          type="text"
          name="studyPlan"
          value={formData.studyPlan}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        />
      </label>

      <label>
        Do you prefer short summaries or detailed explanations?
        <select
          name="explanationPreference"
          value={formData.explanationPreference}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        >
          <option value="">Select</option>
          <option value="short summaries">Short Summaries</option>
          <option value="detailed explanations">Detailed Explanations</option>
        </select>
    </label>

    <fieldset>
      <legend>Which of the following study tools do you feel you benefit most from? (Check all that apply)</legend>
      {[
        "Flashcards",
        "Practice quizzes/tests",
        "Step-by-step walkthroughs",
        "Summarized notes/outlines",
        "Real-world examples and case studies",
        "Mnemonics or memory tricks",
        "Checklists and progress trackers",
        "Other (please specify)",
      ].map((tool) => (
        <label
        key={tool}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px", // Adds spacing between checkbox and text
        }}
        >
        <input
          type="checkbox"
          name="studyTools"
          value={tool}
          checked={formData.studyTools.includes(tool)}
          onChange={handleChange}
        />
        {tool}
        </label>
      ))}
    </fieldset>

    <fieldset>
      <legend>What do you usually do when you face a roadblock while studying?</legend>
      {[
        "Take a break and come back later",
        "Ask a friend or teacher for help",
        "Look up solutions online",
        "Try to figure it out on my own",
      ].map((solution) => (
        <label key={solution} style={{ display: "block", marginBottom: "8px" }}>
        <input
          type="radio"
          name="roadblockSolution"
          value={solution}
          checked={formData.roadblockSolution === solution}
          onChange={handleChange}
        />
        {solution}
        </label>
      ))}
    </fieldset>

    <fieldset>
      <legend>If you had a personal coach while you studied, would you want them to sound like:</legend>
      {["A wise mentor", "A fun friend", "A competitive trainer"].map((style) => (
        <label key={style} style={{ display: "block", marginBottom: "8px" }}>
        <input
          type="radio"
          name="coachStyle"
          value={style}
          checked={formData.coachStyle === style}
          onChange={handleChange}
        />
        {style}
        </label>
      ))}
    </fieldset>

    <fieldset>
      <legend>Would you prefer a study partner to act more:</legend>
      {["patient", "motivating", "creative"].map((trait) => (
        <label
        key={trait}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px", // Adds spacing between radio button and text
          marginBottom: "8px", // Adds spacing between options
        }}
        >
        <input
          type="radio"
          name="studyPartner"
          value={trait}
          checked={formData.studyPartner === trait}
          onChange={handleChange}
        />
        {trait}
        </label>
      ))}
    </fieldset>

    <fieldset>
      <legend>If your study material had a "voice," would you want it to sound:</legend>
      {["Calm and reassuring", "Excited and energetic", "Mysterious and intriguing"].map((voice) => (
        <label
        key={voice}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px", // Adds spacing between radio button and text
          marginBottom: "8px", // Adds spacing between options
        }}
        >
        <input
          type="radio"
          name="studyVoice"
          value={voice}
          checked={formData.studyVoice === voice}
          onChange={handleChange}
        />
        {voice}
        </label>
      ))}
    </fieldset>

      <label>
        What's your favorite way to unwind after a long day?
        <input
          type="text"
          name="unwind"
          value={formData.unwind}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        />
      </label>

      <label>
        What are your biggest hobbies?
        <input
          type="text"
          name="hobbies"
          value={formData.hobbies}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        />
      </label>

      <label>
        What’s your favorite holiday or celebration?
        <input
          type="text"
          name="holiday"
          value={formData.holiday}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        />
      </label>

      <label>
        What's a smell, sound, or texture that instantly brings you comfort?
        <input
          type="text"
          name="comfort"
          value={formData.comfort}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        />
      </label>

      <label>
        Which fictional character would you want as a study buddy?
        <input
          type="text"
          name="studyBuddy"
          value={formData.studyBuddy}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        />
      </label>

      <label>
        What are your favorite movies or television shows?
        <input
          type="text"
          name="favoriteShows"
          value={formData.favoriteShows}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        />
      </label>

      <label>
        What’s your favorite video game or app?
        <input
          type="text"
          name="favoriteGame"
          value={formData.favoriteGame}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        />
      </label>

      <label>
        If you could have dinner with any famous figure (living or dead), who would it be, and why?
        <input
          type="text"
          name="dinnerGuest"
          value={formData.dinnerGuest}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        />
      </label>

      <label>
        If you could go anywhere in the world, where would you like to go? 🐻
        <input
          type="text"
          name="travelDestination"
          value={formData.travelDestination}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        />
      </label>

      <label>
        If you could master any skill instantly, what would it be?
        <input
          type="text"
          name="instantSkill"
          value={formData.instantSkill}
          onChange={handleChange}
          style={{
            outline: "2px solid #ccc", // Adds a visible outline
            padding: "8px", // Adds padding for better spacing
            borderRadius: "4px", // Optional: Rounds the corners
            width: "100%", // Optional: Makes the input take full width
            boxSizing: "border-box", // Ensures padding doesn't affect width
          }}
        />
      </label>

    <button
      type="submit"
      style={{
        marginTop: "20px", // Adds spacing above the button
        marginBottom: "40px", // Adds spacing below the button
        padding: "10px 20px", // Adds padding for better click area
        backgroundColor: "#000", // Sets a black background color
        color: "#fff", // Sets the text color to white
        border: "none", // Removes the default border
        borderRadius: "4px", // Rounds the corners
        cursor: "pointer", // Changes the cursor to a pointer on hover
        fontSize: "16px", // Sets a readable font size
      }}
    >
      Submit Survey
    </button>
    </form>
  );
}