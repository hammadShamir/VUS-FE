import React, { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    style?: string
}

const Container: React.FC<ContainerProps> = (props) => {
    return (
        <section className={`relative max-w-screen-xl mx-auto px-4 xl:px-0 ${props.style}`}>
            {props.children}
        </section>
    );
};

export default Container;
