import React from 'react'
import { Button } from './ui/button'
import InstagramSlider from './InstagramSlider'

const EmbeddedPost = () => {
    return (
        <section className="h-screen bg-secondary py-8 px-6 xl:px-0">
            <div className='max-w-screen-lg mx-auto flex flex-col md:flex-row md:justify-between items-center gap-x-12 gap-y-6'>
                <div className="space-y-4 lg:w-2/4">
                    <h2 className="font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-foreground md:text-4xl">
                        Follow us on instagram
                    </h2>
                    <p className='text-foreground font-[family-name:var(--font-secondary)] text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porttitor tellus vel mauris scelerisque accumsan. Maecenas quis nunc sed sapien dignissim pulvinar. Se d at gravida ligula, eget hendrerit nisi. Pellentesque at congue mauris. posuere finibus risus. </p>
                    <Button variant={'outline'}>Instagram</Button>
                </div>
                <div className='h-full lg:w-2/4'>
                    <InstagramSlider />
                </div>
            </div>
        </section>
    )
}

export default EmbeddedPost
