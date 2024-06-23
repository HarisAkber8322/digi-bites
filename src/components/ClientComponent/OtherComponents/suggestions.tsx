// components/SuggestionComponent.tsx
import { useState } from "react";
import Div from "@/components/UI/Div"; // Assuming you have these components
import Text from "@/components/UI/Text"; // Assuming you have these components

const SuggestionComponent = () => {
  const [newSuggestion, setNewSuggestion] = useState("");
  const [existingSuggestions, setExistingSuggestions] = useState<string[]>([]);

  const handleNewSuggestion = () => {
    // Logic to handle adding a new suggestion
    if (newSuggestion.trim() !== "") {
      setExistingSuggestions([...existingSuggestions, newSuggestion]);
      setNewSuggestion("");
    }
  };

  const handleVote = (index: number) => {
    // Logic to handle voting on a suggestion
    const updatedSuggestions = existingSuggestions.map((s, i) =>
      i === index ? s + " (Voted)" : s
    );
    setExistingSuggestions(updatedSuggestions);
  };

  return (
    <Div
    themeDivClasses="flex justify-center items-center w-full h-full"
    content={<>
         <Div 
         themeDivClasses="flex flex-col w-full max-w-lg"
         content={<>
               <Div
               themeDivClasses="grid grid-cols-2 gap-4"
               content={<>
                    <Div themeDivClasses="bg-gray-100 p-4 rounded-md" 
                    content={<>
                        <Text themeDivClasses="font-bold mb-2" content="Make Your Suggestion" />
            <input
              type="text"
              value={newSuggestion}
              onChange={(e) => setNewSuggestion(e.target.value)}
              placeholder="Enter your suggestion..."
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
            />
            <button
              onClick={handleNewSuggestion}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Add Suggestion
            </button>
                    </>}
                    />
        
       

          {/* Section to vote on existing suggestions */}
          <div className="bg-gray-100 p-4 rounded-md">
            <Text themeDivClasses="font-bold mb-2" content="Vote on Suggestions" />
            <ul>
              {existingSuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-center justify-between mb-2">
                  <Text themeDivClasses="" content={suggestion} />
                  <button
                    onClick={() => handleVote(index)}
                    className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                  >
                    Vote
                  </button>
                </li>
              ))}
            </ul>
          </div>
               </>}
            />
          {/* Section to add a new suggestion */}
     
    
         </>}
         />
  
     

    </>}
    />
    
  );
};

export default SuggestionComponent;
