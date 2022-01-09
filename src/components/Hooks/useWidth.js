import {useState, useEffect} from 'react';

const useWidth =()=>{
    const [width, setWidth] = useState({width: window.innerWidth});

    useEffect(()=>{
        const removeResize = window.addEventListener("resize", handleResize)
        return ()=> removeResize
    },[])

    const handleResize =()=>{
            setWidth({
                width: window.innerWidth,
            })
        }

    return width
}

export default useWidth;
