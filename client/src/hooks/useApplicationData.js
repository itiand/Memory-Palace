import tailwindConfig from '../../tailwind.config.js'
const { themes } = tailwindConfig;


const memoryPalace = [
  {
    id: 1,
    name: "palace1",
    front_img_url: "https://i.imgur.com/RBJ5YSd.jpeg"
  },
  {
    id: 2,
    name: "fresh prince",
    front_img_url: "https://media.architecturaldigest.com/photos/5f60d4247cb92d03f8366538/16:9/w_2560%2Cc_limit/01_Airbnb_Fresh_Exterior-A.jpg"
  },
  {
    id: 3,
    name: "the office",
    front_img_url: "https://i0.wp.com/lokagraph.com/wp-content/uploads/2018/05/dunder-Mifflin-building-the-office-where-location.jpg?fit=2048%2C1280"
  },
  {
    id: 4,
    name: "big bang theory",
    front_img_url: "https://s28943.pcdn.co/wp-content/uploads/2019/06/Apt-4A-TV-Approved.jpg"
  }
]


const useApplicationData = () => {
  return {
    memoryPalace,
    themes
  }
}

export default useApplicationData