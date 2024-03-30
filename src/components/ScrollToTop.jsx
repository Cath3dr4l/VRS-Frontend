import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 100) {
      setVisible(true);
    } else if (scrolled <= 100) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className="z-[100] fixed bottom-16 right-16 text-4xl bg-primary text-white rounded-3xl p-4 ease-in-out transition-all duration-300 hover:bg-red-700 hover:ring-4 hover:ring-primary-dark hover:ring-opacity-80"
      style={{
        display: visible ? "inline" : "none",
        transform: visible ? "translateY(-10px)" : "none",
      }}
    >
      <FaArrowCircleUp />
    </button>
  );
};

export default ScrollToTop;
