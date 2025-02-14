import { DashboardSidebar } from '@/components/common/Dashboard-Sidebar'
import Header2 from '@/components/common/Header/Header2'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <Header2 />
            <div className="flex h-full">
                <DashboardSidebar />
                <section className='md:ms-64 mt-20 mb-14 md:mb-0 py-4 px-3 md:px-6 w-full'>
                    {children}
                </section>
            </div>
        </main>
    )
}

export default layout
