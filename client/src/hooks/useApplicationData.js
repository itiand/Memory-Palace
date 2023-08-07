import tailwindConfig from '../../tailwind.config.js'
const { themes } = tailwindConfig;

const useApplicationData = () => {
  return {
    themes
  }
}

export default useApplicationData