
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




// const palaceExample = {
//   PalaceName: "the office",
//   PalaceCoverImg: "https://i0.wp.com/lokagraph.com/wp-content/uploads/2018/05/dunder-Mifflin-building-the-office-where-location.jpg?fit=2048%2C1280",
//   PalaceToDoList: {
//     toDo1: {
//       keyword: "Flexbox",
//       definition: "CSS method to arrange layouts",
//       returnedAiImgs: {
//         aiImage1: "https://openailabsprodscus.blob.core.windows.net/private/user-osAbBO59ww5BxmQOppRnsyp7/generations/generation-9gXYtyRstySiFlQ4p18pGoj2/image.webp?st=2023-08-09T19%3A11%3A49Z&se=2023-08-09T21%3A09%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-09T10%3A19%3A24Z&ske=2023-08-16T10%3A19%3A24Z&sks=b&skv=2021-08-06&sig=V5MHEls64ZgeWFwuz62FS%2BOyuhCiLl125XLIC86XFOQ%3D",
//         aiImage2: "https://openailabsprodscus.blob.core.windows.net/private/user-osAbBO59ww5BxmQOppRnsyp7/generations/generation-wlnuPfBCIsXbgKIX4V3AKvfW/image.webp?st=2023-08-09T19%3A11%3A49Z&se=2023-08-09T21%3A09%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-09T10%3A19%3A24Z&ske=2023-08-16T10%3A19%3A24Z&sks=b&skv=2021-08-06&sig=KbIWpARkQWwg8iSEBi8T%2B0oRdEHImtqyeYj1QFQXtjA%3D",
//         aiImage3: "https://openailabsprodscus.blob.core.windows.net/private/user-osAbBO59ww5BxmQOppRnsyp7/generations/generation-9gXYtyRstySiFlQ4p18pGoj2/image.webp?st=2023-08-09T19%3A11%3A49Z&se=2023-08-09T21%3A09%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-09T10%3A19%3A24Z&ske=2023-08-16T10%3A19%3A24Z&sks=b&skv=2021-08-06&sig=V5MHEls64ZgeWFwuz62FS%2BOyuhCiLl125XLIC86XFOQ%3D",
//         aiImage4: "https://openailabsprodscus.blob.core.windows.net/private/user-osAbBO59ww5BxmQOppRnsyp7/generations/generation-v2VG5z7QtJ1E5EAnkttiQmR4/image.webp?st=2023-08-09T19%3A11%3A49Z&se=2023-08-09T21%3A09%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-09T10%3A19%3A24Z&ske=2023-08-16T10%3A19%3A24Z&sks=b&skv=2021-08-06&sig=Twp5yatVjfQEOGpmrrrHWlY68M/ZQ%2BRVdDO/p%2BaGDwY%3D"
//       },
//       chosenAiImg: "https://openailabsprodscus.blob.core.windows.net/private/user-osAbBO59ww5BxmQOppRnsyp7/generations/generation-v2VG5z7QtJ1E5EAnkttiQmR4/image.webp?st=2023-08-09T19%3A11%3A49Z&se=2023-08-09T21%3A09%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-09T10%3A19%3A24Z&ske=2023-08-16T10%3A19%3A24Z&sks=b&skv=2021-08-06&sig=Twp5yatVjfQEOGpmrrrHWlY68M/ZQ%2BRVdDO/p%2BaGDwY%3D",
//       gptDrawDesc: "artist palette on fire ",
//       gptNarrateDesc: "An artist's palette on fire embodies a fusion of colors akin to a blazing inferno. It symbolizes the fervor of creation, with vivid reds, oranges, and yellows intertwining in a dynamic dance. This image captures the passionate intensity and creative sparks that ignite within an artist's imagination, infusing their work with a vivid and fiery essence."
//     }
//   },
//   Rooms: {
//     "Main Office": {
//       roomDescription: "where paper magic happens",
//       roomImg: "https://media.timeout.com/images/105824238/750/422/image.jpg",
//       roomPins: [
//         {
//           x: null,
//           y: null,
//           toDoItem: null,
//         }
//       ],
//     },
//   }
// };
