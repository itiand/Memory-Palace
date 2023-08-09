
const Palace = {
  "_id": "64d3cad2513cf28f3e4803f0",
  "PalaceName": "Palace Name",
  "PalaceCoverImg": "url",
     // each Palace has 1 toDoList
  "PalaceToDoList": {
      "toDo1" : {
        "keyword": "keyword", 
        "definition": "definition",
        "returnedAiImgs": {
          "aiImage1": "url",
          "aiImage2": "url",
          "aiImage3": "url",
          "aiImage4": "url"
        },
        "chosenAiImg": "",
        "gptDrawDesc": "",
        "gptNarrateDesc": "",
      },
      "toDo2" : {
        "keyword": "keyword", 
        "definition": "definition",
        "returnedAiImgs": {
          "aiImage1": "url",
          "aiImage2": "url",
          "aiImage3": "url",
          "aiImage4": "url"
        },
        "chosenAiImg": "",
        "gptDrawDesc": "",
        "gptNarrateDesc": "",
      },
      "toDo3" : {
        "keyword": "keyword", 
        "definition": "definition",
        "returnedAiImgs": {
          "aiImage1": "url",
          "aiImage2": "url",
          "aiImage3": "url",
          "aiImage4": "url"
        },
        "chosenAiImg": "",
        "gptDrawDesc": "",
        "gptNarrateDesc": "",
      },
  },
  
  "Rooms": {
    "room1": {
      "roomDescription" : "roomDescription",
      "roomImg": "url",
      "roomPins": {
         "pin1": { 
          "x": "x1", 
          "y": "y1",
          "toDo": "toDo1" 
        },
        "pin2": { 
          "x": "x1", 
          "y": "y1",
          "toDo": "toDo2" 
        },
        "pin3": { 
          "x": "x1", 
          "y": "y1",
          "toDo": "toDo3" 
        },
      },
   

      },
  }
}

// Each waypoint should be an x,y + name and description + image. not separate lists of each



// termForAiDrawer = (keyword, definition) => {
//   return give me a symbol that best describes ${keyword} + ${definition}. Make it short, make it easy to draw, no more than 5 words.
// }



// termForAiDrawer = (symboldescription) => {
//   return Draw me ${symboldescription} Make it 90 by 90 pixels;
// }


// User Input
// ChatGPT Input
// Dall-E Images