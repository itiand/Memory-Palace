import { useState, useEffect } from 'react';


// Speech
// const SpeakText = (text) => {
//     const speechSynthesis = window.speechSynthesis;
  
//     // Initialize voices state
//     const [voices, setVoices] = useState([]);
    
    
//     useEffect(() => {
//         // Listen for the voices to be loaded
//         speechSynthesis.addEventListener("voiceschanged", () => {
//             // Once the voices are available, get them
//             const updatedVoices = speechSynthesis.getVoices();
//             setVoices(updatedVoices);
//         });
        
//         // Get initial voices when component mounts
//         const initialVoices = speechSynthesis.getVoices();
//         setVoices(initialVoices);
//     }, []);
    
//     console.log(voices);
//     // Use a more dynamic method to choose a voice
//     const selectedVoice = voices.find(voice => voice.name === "Karen");
//     const utterance = new SpeechSynthesisUtterance(text);
//   // 50, 49, 51, 11
//   // 11, 50, 51 57
//   // 54 55 60 61
//   // voice 0 aint bad
//   // voice 10, 11{stephen}
//   // utterance.pitch = voices[0];
//   // Configure speech parameters if needed (e.g., rate, pitch)
//   // utterance.rate = ...;
//   // utterance.pitch = ...;
  
//     if (selectedVoice) {
//         utterance.voice = selectedVoice;
//     }
  
//     // Configure speech parameters if needed (e.g., rate, pitch)
//     utterance.rate = 1; // Adjust the speech rate
//     utterance.pitch = 1; // Adjust the speech pitch
  
//     // Speak the text
//     speechSynthesis.speak(utterance);
//   }

// SpeakText.js



export default useSpeakText;

  
