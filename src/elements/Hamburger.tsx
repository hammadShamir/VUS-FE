import { IHamBurger } from '@/interfaces';
import React from 'react'

const Hamburger: React.FC<IHamBurger> = (props) => {
    const toggleSidebar = () => {
        props.setIsOpen(!props.isOpen);
    };
    return (
        <button
            onClick={toggleSidebar}
            className="relative w-10 h-8 flex flex-col justify-center items-center group"
        >
            <div
                className={`absolute w-full h-1 bg-background transition-transform duration-300 ${props.isOpen ? "rotate-45" : "-translate-y-2"
                    }`}
            ></div>
            <div
                className={`absolute w-full h-1 bg-background
                transition-transform duration-300 ${props.isOpen ? "-rotate-45" : "translate-y-2"
                    }`}
            ></div>
        </button>
    )
}

export default Hamburger
