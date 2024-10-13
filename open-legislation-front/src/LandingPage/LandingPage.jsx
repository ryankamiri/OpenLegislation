import { FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import background from "../oleg-bg.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full">
      <div>
        <img
          src={background}
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full z-0 opacity-20 backdrop-blur"
        />
      </div>

      <div className="flex flex-col items-center justify-center h-screen p-6 z-10 relative">
        <div className="flex items-center text-4xl font-bold text-gray-800 mb-24">
          <FaBookOpen className="mr-2 text-7xl  text-red-500" />
          <div className="mx-5 text-7xl">Open Legislation</div>
          <FaBookOpen className="text-7xl text-blue-500" />
        </div>

        <div className="text-lg font-semibold text-gray-700 mb-4">
          How it works
        </div>

        <ol className="list-decimal list-inside text-left text-gray-700 space-y-2 mb-8 max-w-lg">
          <li>Search keywords for the Congressional Bills.</li>
          <li>Click on a bill to read more about it</li>
          <li>
            Instead of reading through hundreds of pages, we will summarize it
            for you!
          </li>
          <li>
            Save time and enjoy learning about these bills without having to
            read through legal jargon
          </li>
        </ol>
        <div>
          <button
            onClick={() => navigate("/home")}
            className="bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 hover:shadow-md text-white py-2 px-4 hover:bg-gradient-to-r transition duration-300 rounded-lg"
          >
            &nbsp; Get Started! &nbsp;
          </button>
        </div>
      </div>
    </div>
  );
}
