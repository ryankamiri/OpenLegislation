import { FaBookOpen } from "react-icons/fa";
import App from "../App";
export default function LandingPage(){

    return(
        <div>
            
            <h1>Open Legislation<FaBookOpen /></h1>
            <FaBookOpen />


            <h2>How it works</h2>
            <ul>
                <ol>Search for a bill in the Congress</ol>
                <ol>You will be given a list in chronological order</ol>
                <ol>Click on the bill you are interested in</ol>
                <ol>Instead of reading through hundreds of pages, we will summarize it for you!</ol>
                <ol>Save time and enjoy not reading boring stuff</ol>
            </ul>   

            
            <button onClick={ App }>Get started!</button>

        </div>
    )
}