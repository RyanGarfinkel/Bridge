'use client';

import { useData } from '@/context/DataProvider';
import { useRouter } from 'next/navigation';

export default function Survey() {

  const { updateSurvey } = useData();

  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log('about to submit survey:');
    updateSurvey(data);
    router.push('/dashboard');
  };

  return (

    <form className="flex flex-col gap-5 max-w-xl mx-auto font-sans" onSubmit={handleSubmit}>
      <h1 className="mt-10 text-4xl text-center">Survey</h1>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="name" className="text-lg">What&apos;s your name?</label>
        <input id="name" name="name" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg" type="text" required />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="dob" className="text-lg">When were you born?</label>
        <input id="dob" name="dob" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg" type="date" required />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="loc" className="text-lg">Where are you from?</label>
        <input id="loc" name="loc" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg" type="text" required/>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="pronouns" className="text-lg">Where are your pronouns?</label>
        <input id="pronouns" name="pronouns" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg" type="text" required/>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="pets" className="text-lg">Do you have pets? If so, what kind?</label>
        <input id="pets" name="pets" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg" type="text" required />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="university" className="text-lg">Which university do you go to?</label>
        <input id="university" name="university" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg" type="text" required />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="studying" className="text-lg">What are you studying</label>
        <input id="studying" name="studying" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg" type="text" />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="explanation-length" className="text-lg">Do you prefer short summaries or detailed explanations?</label>
        <select id="explanation-length" name="explanation-length" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg">
          <option value="short">Short Summaries</option>
          <option value="detailed">Detailed Explanations</option>
        </select>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="study-tools" className="text-lg">Do you prefer short summaries or detailed explanations?</label>
        <label htmlFor="study-tools" className="text-lg">(Check all that apply)</label>
        <fieldset id="study-tools" name="study-tools" className="py-2 px-3 text-lg">
          {
            [
              'Flashcards', 'Practice quizzes/tests', 'Step-by-step walkthroughs', 'Summarized notes/outlines',
              'Real-world examples and case studies', 'Mnemonics or memory tricks', 'Checklists and progress trackers',
              'Other (please specify)',
            ].map((tool, i) => (
              <div key={i} className="flex flex-row items-center gap-2">
                <input type="checkbox" id={`tool-${i}`} name="study-tools" value={tool} />
                <label htmlFor={`tool-${i}`} className="text-lg"> { tool } </label>
              </div>
            ))
          }
        </fieldset>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="roadblock" className="text-lg">What do you usually do when you face a roadblock while studying?</label>
        <fieldset id="roadblock" name="roadblock" className="py-2 px-3 text-lg">
          {
            [
              'Take a break and come back later', 'Ask a friend or teacher for help',
              'Look up solutions online', 'Try to figure it out on my own',
            ].map((tool, i) => (
              <div key={i} className="flex flex-row items-center gap-2">
                <input type="radio" id={`roadblock-item-${i}`} name="roadblock" value={tool} />
                <label htmlFor={`roadblock-item-${i}`} className="text-lg"> { tool } </label>
              </div>
            ))
          }
        </fieldset>
      </div>

      <div className="grid w-full items-center gap-1.5">
          <label htmlFor="mentor" className="text-lg">If you had a personal coach while you studied, would you want them to sound like:</label>
          <fieldset id="mentor" name="mentor" className="py-2 px-3 text-lg">
            {
              [
                'A wise mentor', 'A fun friend', 'A competitive trainer'
              ].map((person, i) => (
                <div key={i} className="flex flex-row items-center gap-2">
                  <input type="radio" id={`mentor-${i}`} name="mentor" value={person} />
                  <label htmlFor={`mentor-${i}`} className="text-lg"> { person } </label>
                </div>
              ))
            }
          </fieldset>
      </div>

      <div className="grid w-full items-center gap-1.5">
          <label htmlFor="partner" className="text-lg">Would you prefer a study partner to act more:</label>
          <fieldset id="partner" name="partner" className="py-2 px-3 text-lg">
            {
              [
                'patient', 'motivating', 'creative'
              ].map((person, i) => (
                <div key={i} className="flex flex-row items-center gap-2">
                  <input type="radio" id={`partner-${i}`} name="partner" value={person} />
                  <label htmlFor={`partner-${i}`} className="text-lg"> { person } </label>
                </div>
              ))
            }
          </fieldset>
      </div>

      <div className="grid w-full items-center gap-1.5">
          <label htmlFor="voice" className="text-lg">If your study material had a &quot;voice,&quot; would you want it to sound:</label>
          <fieldset id="voice" name="voice" className="py-2 px-3 text-lg">
            {
              [
                'Calm and reassuring', 'Excited and energetic', 'Mysterious and intriguing'
              ].map((voice, i) => (
                <div key={i} className="flex flex-row items-center gap-2">
                  <input type="radio" id={`voice-${i}`} name="voice" value={voice} />
                  <label htmlFor={`voice-${i}`} className="text-lg"> { voice } </label>
                </div>
              ))
            }
          </fieldset>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="relaxing" className="text-lg">What&apos;s your favorite way to unwind after a long day?</label>
        <input id="relaxing" name="relaxing" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg" type="text" required />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="hobby" className="text-lg">What are your biggest hobbies?</label>
        <input id="hobby" name="hobby" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg" type="text" required/>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="holiday" className="text-lg">What’s your favorite holiday or celebration?</label>
        <input id="holiday" name="holiday" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg" type="text" required />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="sensory" className="text-lg">What&apos;s a smell, sound, or texture that instantly brings you comfort?</label>
        <input id="sensory" name="sensory" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg" type="text" required />
      </div>


      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="fictionalCharacter" className="text-lg">Which fictional character would you want as a study buddy??</label>
        <input id="fictionalCharacter" name="fictionalCharacter" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg" type="text" required />
      </div>


      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="show" className="text-lg">What are your favorite movies or television shows?</label>
        <input id="show" name="show" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg" type="text" required />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="favoriteApp" className="text-lg">What’s your favorite video game or app?</label>
        <input id="favoriteApp" name="favoriteApp" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg" type="text" required />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="dinnerGuest" className="text-lg">If you could have dinner with any famous figure (living or dead), who would it be, and why?</label>
        <input id="dinnerGuest" name="dinnerGuest" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg" type="text" required />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="instantSkill" className="text-lg">If you could master any skill instantly, what would it be?</label>
        <input id="instantSkill" name="instantSkill" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg" type="text" required />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="travelDestination" className="text-lg">If you could go anywhere in the world, where would you like to go? 🐻</label>
        <input id="travelDestination" name="travelDestination" className="border-gray-300 border-3 rounded rounded-lg py-2 px-3 text-lg" type="text" required />
      </div>

      <button type="submit" className="mt-5 mb-10 px-5 py-2 bg-black text-white rounded cursor-pointer text-lg">
        Submit Survey
      </button>
    </form>
  );
}