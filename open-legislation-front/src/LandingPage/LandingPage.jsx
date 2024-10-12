import { FaBookOpen } from "react-icons/fa";
import App from "../App";
import MainPage from "../main-page/MainPage";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {

    const navigate = useNavigate();

    return(
        <div className='flex h-full bg-gray-100'>
            <h1><FaBookOpen /> Open Legislation</h1>
            <h2>How it works</h2>
            <ol>
                <li>Search for a bill or issue in Congress you are interested in</li>
                <li>You will be given a list in chronological order</li>
                <li>Click on a bill to read more about it</li>
                <li>Instead of reading through hundreds of pages, we will summarize it for you!</li>
                <li>Save time and enjoy learning about these bills without having to read through legal jargon</li>
            </ol>   

            
            <button onClick={() => navigate('/results')}>Get started!</button>

        </div>
    )
}