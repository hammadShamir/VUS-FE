import React, { useState } from 'react'

const LocaleDropdown = () => {
    const [title, setTitle] = useState<string>('EN');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleDropDown = () => {
        setIsOpen(!isOpen)
        setTitle("helo")
    }
    return (
        <div className='relative'>
            <button
                className='text-background text-2xl'
                onClick={handleDropDown}
            >{title}</button>
            <ul className={`rounded absolute left-[-18] top-[35] bg-background w-16 text-center ${isOpen ? "block" : "hidden"}`}>
                <li className='p-2'>Id</li>
            </ul>
        </div>
    )
}

export default LocaleDropdown
