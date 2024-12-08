import React from 'react'
import Hamburger from '@/elements/Hamburger'
import ModalSidebar from '../Sidebar';

const Header2 = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    return (
        <header className='bg-primary py-4 fixed w-full top-0 left-0 z-10'>
            <div className='max-w-screen-xl mx-auto px-4 xl:px-0'>
                <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />

            </div>
            <ModalSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </header>
    )
}

export default Header2
