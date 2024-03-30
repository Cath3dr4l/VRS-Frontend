import React, {useState, useEffect} from 'react'; 
import {FaArrowCircleUp} from 'react-icons/fa'; 

const ScrollToTop = () =>{ 

  const [visible, setVisible] = useState(false) 

  const toggleVisible = () => { 
    const scrolled = document.documentElement.scrollTop; 
    if (scrolled > 100){ 
      setVisible(true) 
    }  
    else if (scrolled <= 100){ 
      setVisible(false) 
    } 
  }; 

  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
    }); 
  }; 

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return ( 
    <button onClick={scrollToTop} className="z-[100]" style={{display: visible ? 'inline' : 'none', position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '50%', padding: '10px', fontSize: '24px'}}> 
     <FaArrowCircleUp /> 
    </button> 
  ); 
} 

export default ScrollToTop;