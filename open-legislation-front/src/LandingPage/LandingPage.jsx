import { FaBookOpen } from "react-icons/fa";
import MainPage from "../main-page/MainPage";

export default function LandingPage(){

    return(
        <div>
            
            <h1>Open Legislation<FaBookOpen /></h1>
            <FaBookOpen />
            <h2>How it works</h2>
            <ol>
                <li>Search for a bill in the Congress</li>
                <li>You will be given a list in chronological order</li>
                <li>Click on the bill you are interested in</li>
                <li>Instead of reading through hundreds of pages, we will summarize it for you!</li>
                <li>Save time and enjoy not reading boring stuff</li>
            </ol>   

            
            <button onClick={MainPage}>Get started!</button>

        </div>
    )
}