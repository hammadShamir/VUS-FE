export interface ISingIN {
    email: string;
    password: string
}

export interface ISignUP extends ISingIN {
    fullname: string;
    phone: string
    confirmPassword: string
}


export interface UserMenuProps {
    onLogout: () => void;
}


export interface IBookingUser {
    _id: string;
    fullName: string;
    email: string;
    phone: number
}