import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)
  return (
   <div className='min-h-screen'>
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        />
        <div className={`min-h-screen ${isSidebarCollapsed ? 'pl-20' : 'pl-64'}`}>
            <div className="h-screen overflow-y-auto">
              <Header/>
              <main className="flex-1 p-2">
                  <Outlet />
              </main>
            </div>
        </div>
    </div>
  )
}

export default MainLayout