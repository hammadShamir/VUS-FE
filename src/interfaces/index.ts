import { SetStateAction } from "react";

export interface IHamBurger {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

export interface ISidebar extends IHamBurger {
    isScrolled: boolean
}