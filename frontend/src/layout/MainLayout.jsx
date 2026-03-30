import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)
  return (
   <div className='h-screen overflow-hidden'>
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
        />
        <div className={`h-screen overflow-hidden ${isSidebarCollapsed ? 'pl-20' : 'pl-64'}`}>
            <div className="h-full overflow-hidden flex flex-col">
              <Header/>
              <main className="flex-1 min-h-0 p-2 overflow-auto">
                  <Outlet />
              </main>
            </div>
        </div>
    </div>
  )
}

export default MainLayout