// import React, { useState } from 'react'
import './App.css'

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
            <p>&copy; 2024 My Website. All rights reserved.</p>
            <div className="flex justify-center space-x-4">
                HackHarvard 2024 - Created by Shishir Pokhrel, Anish Sahoo, Ryan Amiri, Smyan Sengupta
            </div>
        </div>
    </footer>


    //     <footer
    //     className={`relative bottom-0 py-4 w-full text-center mt-1`}
    //   >
    //         Hack Harvard 2024, Made by Shishir Pokhrel, Ryan Amiri, Anish Sahoo, Smyan Sengupta
    //     </footer>
    )
}

export default Footer;



// import React from "react";
// import { useTheme } from "../contexts/themeContext";


//   return (
//     <footer
//       className={`relative bottom-0 py-4 w-full text-center ${theme === "light" ? "bg-light-mode text-dark-mode" : "bg-dark-mode text-light-mode"}`}
//     >
//       <p>
//         Made by {getLinkElement("https://github.com/nwhee", "Jonathan Ding")},{" "}
//         {getLinkElement("https://seanfinch.com", "Sean Finch")},{" "}
//         {getLinkElement("https://github.com/EricHuang05", "Eric Huang")}, and{" "}
//         {getLinkElement("https://shishirpokhrel.com", "Shishir Pokhrel")} • Made
//         for {getLinkElement("https://pawhacks.io", "PawHacks 2024")}
//       </p>
//     </footer>
//   );
// };

// export default Footer;
