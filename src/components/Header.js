import React from 'react'
import '../index.css';

function Header() {
    return (
        <header className="text-center bg-gradient-to-br from-gray-900 to-gray-800 p-10">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-yellow-400 drop-shadow-lg mb-4 rounded-xl px-4 py-2 inline-block bg-opacity-10 bg-yellow-400 backdrop-filter backdrop-blur-sm">
                Star Wars API (SWAPI)
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300">
                A galaxy of heroes, villains, and droids awaits.
            </p>
        </header>
    )
}

export default Header