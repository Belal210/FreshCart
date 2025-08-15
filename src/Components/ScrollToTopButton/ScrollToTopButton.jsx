import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="w-10 h-11 fixed bottom-5 right-8 z-10 flex justify-center items-center bg-primary-600 hover:bg-primary-700 text-white text-lg rounded-full shadow-sm shadow-primary-400 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faChevronUp} className="animate-bounce translate-y-0.5"/>
        </button>
      )}
    </>
  );
}
