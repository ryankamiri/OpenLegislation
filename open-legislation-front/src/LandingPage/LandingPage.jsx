import { FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import background from '../oleg-bg.png';

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
      <div className="flex items-center text-4xl font-bold text-gray-800 mb-36">
        <FaBookOpen className="mr-2 text-red-500" />

        <div className="mx-5">Open Legislation</div>

        <FaBookOpen className=" text-blue-500" />
      </div>

      <div className="text-lg font-semibold text-gray-700 mb-4">
        How it works
      </div>

      <ol className="list-decimal list-inside text-left text-gray-700 space-y-2 mb-8 max-w-lg">
        <li>Search keywords for the Congressional Bills.</li>
        <li>Click on a bill to read more about it</li>
        <li>
          Instead of reading through hundreds of pages, we will summarize it for
          you!
        </li>
        <li>
          Save time and enjoy learning about these bills without having to read
          through legal jargon
        </li>
      </ol>
      <div>
        <button
          onClick={() => navigate("/home")}
          className="bg-red-500 text-white py-2 px-4  hover:bg-red-400 transition duration-300 rounded-tl-lg rounded-bl-lg"
        >
          &nbsp;&nbsp; Get &nbsp;
        </button>
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-500 text-white py-2 px-4  hover:bg-blue-400 transition duration-300 rounded-tr-lg rounded-br-lg"
        >
          Started!
        </button>
      </div>
    </div>
    </div>
  );
}
