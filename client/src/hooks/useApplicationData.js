import tailwindConfig from '../../tailwind.config.js'
const { themes } = tailwindConfig;


const memoryPalace = [
  {
    id: 1,
    name: "palace1",
    front_img_url: "https://images-ext-1.discordapp.net/external/rJs80p45-ElChRCSR3ELP2k_VWSEKauZphmw7PzDpfk/https/i.imgur.com/JjF0Lda.jpg?width=1036&height=1228",
    rooms: []
  },
  {
    id: 2,
    name: "fresh prince",
    front_img_url: "https://media.architecturaldigest.com/photos/5f60d4247cb92d03f8366538/16:9/w_2560%2Cc_limit/01_Airbnb_Fresh_Exterior-A.jpg",
    rooms: []
  },
  {
    id: 3,
    name: "the office",
    front_img_url: "https://i0.wp.com/lokagraph.com/wp-content/uploads/2018/05/dunder-Mifflin-building-the-office-where-location.jpg?fit=2048%2C1280",
    rooms: []
  },
  {
    id: 4,
    name: "big bang theory",
    front_img_url: "https://s28943.pcdn.co/wp-content/uploads/2019/06/Apt-4A-TV-Approved.jpg",
    rooms: []
  }
]


function getInitialSelectedPalace() {
  return   {
    id: ``,
    name: ``,
    front_img_url: ``
  }
}

const initialState = {
  likes: [],
  selectedImg: getInitialSelectedImgState(),
  isModalOpen: false
};

const useApplicationData = () => {
  return {
    memoryPalace,
    themes
  }
}

export default useApplicationData