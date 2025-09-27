import React, {useState, useEffect} from "react";

const ThemeToggle = () => {
       const [darkMode, setDarkMode] = useState(false);  
       
      useEffect(() => { 
      document.body.className = darkMode ? "bg-dark text-light " : "bg-light text-dark";

}, [darkMode]);
    return(
            <button className="btn btn-outline-secondary position-fixed bottom-0 end-0 m-3"
            onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
    );

};
export default ThemeToggle;
