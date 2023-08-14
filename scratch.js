
const Palace = {

  "_id": "64d3cad2513cf28f3e4803f0",
  "PalaceName": "My First Mind Palace",
  "PalaceDescription": "An inner look into the mind of Breadcrumbs Cabbagepatch",
  "PalaceCoverImg": "https://miro.medium.com/v2/resize:fit:720/format:webp/1*E7LZaXyXb9Li4OvMNv32cQ.jpeg",

  "PalaceToDoList": {
    "toDoListName": "Javascript Methods",
    "toDo1": {
      "keyword": ".push()",
      "definition": "Adds one or more elements to the end of an array",
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
    "toDo2": {
      "keyword": ".pop()",
      "definition": "Removes and returns the last element of an array.",
      "returnedAiImgs": {
        "aiImage1": "",
        "aiImage2": "",
        "aiImage3": "",
        "aiImage4": ""
      },
      "chosenAiImg": "",
      "gptDrawDesc": "",
      "gptNarrateDesc": "",
    },
    "toDo3": {
      "keyword": ".shift()",
      "definition": "Removes and returns the first element of an array.",
      "returnedAiImgs": {
        "aiImage1": "",
        "aiImage2": "",
        "aiImage3": "",
        "aiImage4": ""
      },
      "chosenAiImg": "",
      "gptDrawDesc": "",
      "gptNarrateDesc": "",
    },
    "toDo4": {
      "keyword": ".slice",
      "definition": "Creates a new array by extracting elements from an existing array.",
      "returnedAiImgs": {
        "aiImage1": "",
        "aiImage2": "",
        "aiImage3": "",
        "aiImage4": ""
      },
      "chosenAiImg": "",
      "gptDrawDesc": "",
      "gptNarrateDesc": "",
    },
    "toDo5": {
      "keyword": ".splice()",
      "definition": "Changes an array by adding or removing elements.",
      "returnedAiImgs": {
        "aiImage1": "",
        "aiImage2": "",
        "aiImage3": "",
        "aiImage4": ""
      },
      "chosenAiImg": "",
      "gptDrawDesc": "",
      "gptNarrateDesc": "",
    },
    "toDo6": {
      "keyword": ".concat()",
      "definition": "Combines arrays to create a new array.",
      "returnedAiImgs": {
        "aiImage1": "",
        "aiImage2": "",
        "aiImage3": "",
        "aiImage4": ""
      },
      "chosenAiImg": "",
      "gptDrawDesc": "",
      "gptNarrateDesc": "",
    },
    "toDo7": {
      "keyword": ".forEach()",
      "definition": "Executes a provided function once for each array element.",
      "returnedAiImgs": {
        "aiImage1": "",
        "aiImage2": "",
        "aiImage3": "",
        "aiImage4": ""
      },
      "chosenAiImg": "",
      "gptDrawDesc": "",
      "gptNarrateDesc": "",
    },
    "toDo8": {
      "keyword": ".map()",
      "definition": "Creates a new array by applying a function to each element.",
      "returnedAiImgs": {
        "aiImage1": "",
        "aiImage2": "",
        "aiImage3": "",
        "aiImage4": ""
      },
      "chosenAiImg": "",
      "gptDrawDesc": "",
      "gptNarrateDesc": "",
    },
    "toDo9": {
      "keyword": ".filter()",
      "definition": "Creates a new array with elements that pass a test.",
      "returnedAiImgs": {
        "aiImage1": "",
        "aiImage2": "",
        "aiImage3": "",
        "aiImage4": ""
      },
      "chosenAiImg": "",
      "gptDrawDesc": "",
      "gptNarrateDesc": "",
    },
    "toDo10": {
      "keyword": ".reduce()",
      "definition": "Applies a function to reduce an array to a single value.",
      "returnedAiImgs": {
        "aiImage1": "",
        "aiImage2": "",
        "aiImage3": "",
        "aiImage4": ""
      },
      "chosenAiImg": "",
      "gptDrawDesc": "",
      "gptNarrateDesc": "",
    },
  },

  "Rooms": {
    "room1": {
      "roomDescription": "Study",
      "roomImg": "https://media.houseandgarden.co.uk/photos/618938787ec4df9dbbfebc7f/16:9/w_1920,h_1080,c_limit/8fb319cfcc817fa00eaee66e368db0cb-house-11jan17-Arwel-Wyn-Jones--BBC_b.jpg",
      "Pins": [
        {
          x: null,
          y: null,
          toDoItem: null,
        }
      ],
    },
    "room2": {
      "roomDescription": "Bathroom",
      "roomImg": "https://dornob.com/wp-content/uploads/2009/03/vintage-bathroom-interior-design.jpg",
      "ins": [
        {
          x: null,
          y: null,
          toDoItem: null,
        }
      ],
    },

    "room3": {
      "roomDescription": "Kitchen",
      "roomImg": "https://cdn.80.lv/api/upload/content/63/625e4a942c5f1.jpg",
      "Pins": [
        {
          x: null,
          y: null,
          toDoItem: null,
        }
      ],
    },
  }

  
};

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



const palaceExample = {
  PalaceName: "the office", // NEEDED
  PalaceCoverImg: "https://i0.wp.com/lokagraph.com/wp-content/uploads/2018/05/dunder-Mifflin-building-the-office-where-location.jpg?fit=2048%2C1280", //NEEDED
  PalaceToDoList: {
    toDo1: {
      keyword: "Flexbox",
      definition: "CSS method to arrange layouts",
      returnedAiImgs: {
        aiImage1: "https://openailabsprodscus.blob.core.windows.net/private/user-osAbBO59ww5BxmQOppRnsyp7/generations/generation-9gXYtyRstySiFlQ4p18pGoj2/image.webp?st=2023-08-09T19%3A11%3A49Z&se=2023-08-09T21%3A09%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-09T10%3A19%3A24Z&ske=2023-08-16T10%3A19%3A24Z&sks=b&skv=2021-08-06&sig=V5MHEls64ZgeWFwuz62FS%2BOyuhCiLl125XLIC86XFOQ%3D",
        aiImage2: "https://openailabsprodscus.blob.core.windows.net/private/user-osAbBO59ww5BxmQOppRnsyp7/generations/generation-wlnuPfBCIsXbgKIX4V3AKvfW/image.webp?st=2023-08-09T19%3A11%3A49Z&se=2023-08-09T21%3A09%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-09T10%3A19%3A24Z&ske=2023-08-16T10%3A19%3A24Z&sks=b&skv=2021-08-06&sig=KbIWpARkQWwg8iSEBi8T%2B0oRdEHImtqyeYj1QFQXtjA%3D",
        aiImage3: "https://openailabsprodscus.blob.core.windows.net/private/user-osAbBO59ww5BxmQOppRnsyp7/generations/generation-9gXYtyRstySiFlQ4p18pGoj2/image.webp?st=2023-08-09T19%3A11%3A49Z&se=2023-08-09T21%3A09%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-09T10%3A19%3A24Z&ske=2023-08-16T10%3A19%3A24Z&sks=b&skv=2021-08-06&sig=V5MHEls64ZgeWFwuz62FS%2BOyuhCiLl125XLIC86XFOQ%3D",
        aiImage4: "https://openailabsprodscus.blob.core.windows.net/private/user-osAbBO59ww5BxmQOppRnsyp7/generations/generation-v2VG5z7QtJ1E5EAnkttiQmR4/image.webp?st=2023-08-09T19%3A11%3A49Z&se=2023-08-09T21%3A09%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-09T10%3A19%3A24Z&ske=2023-08-16T10%3A19%3A24Z&sks=b&skv=2021-08-06&sig=Twp5yatVjfQEOGpmrrrHWlY68M/ZQ%2BRVdDO/p%2BaGDwY%3D"
      },
      chosenAiImg: "https://openailabsprodscus.blob.core.windows.net/private/user-osAbBO59ww5BxmQOppRnsyp7/generations/generation-v2VG5z7QtJ1E5EAnkttiQmR4/image.webp?st=2023-08-09T19%3A11%3A49Z&se=2023-08-09T21%3A09%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-09T10%3A19%3A24Z&ske=2023-08-16T10%3A19%3A24Z&sks=b&skv=2021-08-06&sig=Twp5yatVjfQEOGpmrrrHWlY68M/ZQ%2BRVdDO/p%2BaGDwY%3D",
      gptDrawDesc: "artist palette on fire ",
      gptNarrateDesc: "An artist's palette on fire embodies a fusion of colors akin to a blazing inferno. It symbolizes the fervor of creation, with vivid reds, oranges, and yellows intertwining in a dynamic dance. This image captures the passionate intensity and creative sparks that ignite within an artist's imagination, infusing their work with a vivid and fiery essence."
    } // NULL IN THE BEGINNING
  },
  Rooms: [
    { 
      name: "main ffice",
      description: "where paper magic happens",
      roomImg: "https://media.timeout.com/images/105824238/750/422/image.jpg",
      roomPins: [
        {
          x: null,
          y: null,
          toDoItem: null,
        }
      ],
    },
    {
      name: "lunch room",
      description: "place to eat - has vending machine, microwave, and fridge",
      roomImg: "https://media.timeout.com/images/105824267/image.jpg",
      roomPins: [
        {
          x: null,
          y: null,
          toDoItem: null,
        }
      ]
    },
    {
      name: "michael's office",
      description: "lots of items on desk as reference point",
      roomImg: "https://virtual-bg.com/wp-content/uploads/2020/06/the-office-2-background-for-teams-or-zoom-1536x864.jpg",
      roomPins: [
        {
          x: null,
          y: null,
          toDoItem: null,
        }
      ]
    },
  ] //NULL
};
