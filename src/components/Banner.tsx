import React from 'react'

interface IBanner {
    bgImg: string;
    title: string;
    breadCrumbs?: {
        current: string;
        prev: string
    }
    para: string;
    parameters?: boolean
}

const Banner: React.FC<IBanner> = (banner) => {
    console.log(banner.bgImg)
    return (
        <div
            className={`relative ${banner.parameters ? 'h-screen' : 'h-[calc(100vh-20vh)]'} bg-no-repeat bg-center bg-cover bg-fixed flex justify-center items-center`}
            style={{
                backgroundImage: `url(${banner?.bgImg})`,
            }}
        >
            <div className='absolute top-o left-0 w-full h-full bg-black opacity-40'></div>
            <div className='z-10 max-w-screen-md space-y-2'>
                <h1 className='text-background text-3xl md:text-7xl font-extrabold font-[family-name:var(--font-primary)] text-center'>{banner.title}</h1>
                {
                    banner.breadCrumbs && <div>

                    </div>
                }
                <p className='text-background text-lg text-center font-[family-name:var(--font-secondary)]'>{banner.para}</p>
            </div>
        </div>
    )
}

export default Banner
