import { useState, useEffect } from 'react'

const useWindowDimensions = () => {
    
    const getWidth = () => window.innerWidth 
        || document.documentElement.clientWidth 
        || document.body.clientWidth
    const getHeight = () => window.innerHeight 
        || document.documentElement.clientHeight 
        || document.body.clientHeight

    const [ width, setWidth ] = useState(getWidth())
    const [ height, setHeight ] = useState(getHeight())

    const resizeListener = () => {
      setWidth(getWidth())
      setHeight(getHeight())
    };

    useEffect(() => {
        window.addEventListener('resize', resizeListener);
        return () => {
          window.removeEventListener('resize', resizeListener);
        }
      }, [])

    return {
        width,
        height,
    }
}

export default useWindowDimensions