import { DashboardSidebar } from '@/components/common/Dashboard-Sidebar'
import Header2 from '@/components/common/Header/Header2'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import ProfileForm from './ProfileForm'

const Page = () => {
  return (
    <main className="relative">
      <Header2 />
      <div className="flex h-full">
        <DashboardSidebar />
        <ProfileForm />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  )
}

export default Page
