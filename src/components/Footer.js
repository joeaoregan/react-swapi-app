import React from 'react'
import '../index.css';
import { ReactComponent as LinkedInSVG } from '../svg/linkedin.svg';
import { ReactComponent as GitHubSVG } from '../svg/github.svg';
import { ReactComponent as StarWarsSVG } from '../svg/starwars.svg';

function Footer() {
    return (
        <footer className="flex items-center grid grid-cols-3 gap-6 bg-gray-950 p-5 text-white text-center">
            <div className="max-width p-5">
                <div className="hover:scale-110" >
                <a className="hover:scale-110" href="https://joeaoregan.github.io">Home</a> <br />
                </div>
                <div className="hover:scale-110" >
                <a href="https://github.com/joeaoregan/react-swapi-app">GitHub Repo</a>
                </div>
            </div>
            <div className="p-5">
                <h2>Joe O'Regan</h2>
                <p>React Star Wars API App</p>
            </div>
            <div className="flex place-content-center p-5">
                <div className="p-2 place-content-center hover:scale-110">
                    <a href="https://github.com/joeaoregan">
                        {/* <span className="sr-only">GitHub</span> */}
                        <GitHubSVG fill="white" width="40px" height="40px" title="GitHub" />
                    </a>
                </div>
                <div className="p-2 place-content-center hover:scale-110">
                    <a href="https://www.linkedin.com/in/joeaoregan/">
                        <LinkedInSVG fill="white" width="40px" height="40px" title="LinkedIn" />
                    </a>
                </div>
                <div className="place-content-center hover:scale-110">
                    <a href="https://swapi.tech/">
                        <StarWarsSVG fill="white" width="100px" height="100px" title="Star Wars API" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer


