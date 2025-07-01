import React from "react";
import studyArt from '../assets/illustration.svg';
import { Link } from 'react-router-dom';


const NavBar = () =>{
    return(
        <div className="NavBar">
            <ul>
                <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet"/>
                <li><a href="#" className="Logo">Dwelq.</a></li>
                <div className="MainNavContainer">
                    <li><a href="#" className="MainNav">Home</a></li>
                    <li><a href="#" className="MainNav">About</a></li>
                    <li><a href="#" className="MainNav">Help</a></li>
                </div>
                <li><Link to="/login" className="Login">Login</Link></li>
            </ul>
        </div>
    )
}

const LandingPage = () => {
    return ( 
            <div className="LandingPage">
                <NavBar />
                <div className="MainContent">
                    <div className="TextContent">
                        <h1>Where focus meets flow.</h1>
                        <h2>
                            Dweliq helps you build discipline, track your focus, and actually finish what you start — no clutter, no guilt.
                        </h2>
                        <a href="#login" className="StartNow">Start Now</a>
                    </div>
                    <div className="SVGArt">
                        <img src={studyArt} alt="Study illustration" className="SVGArtImage" />
                    </div>

                </div>
            </div>
    );
};


export default LandingPage;