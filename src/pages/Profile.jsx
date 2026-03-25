import Header from '@/components/shared/Header'
import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  if (!user) return <div className="p-4">Loading...</div>

  const initials = `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase()

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <Header header="Profile" />

      <div className="bg-white border border-gray-100 mt-8 rounded-3xl shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center transition-all hover:shadow-md">
        
        <div className="w-24 h-24 rounded-full bg-secondary/20 text-primary flex items-center justify-center text-3xl font-bold shrink-0 border-2 border-indigo-100">
          {initials}
        </div>

        <div className="flex-1 space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {user.first_name} {user.last_name}
            </h1>
            <span className="inline-flex items-center justify-center bg-green-50 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-primary w-max">
              {user.role}
            </span>
          </div>

          <div className="text-gray-600 space-y-2 text-sm md:text-base">
            <p className="flex items-center gap-2">
              <span className="font-semibold text-gray-800 w-20">Username:</span>
              <span className="text-gray-500">@{user.username}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold text-gray-800 w-20">Email:</span>
              <span className="text-gray-500">{user.email}</span>
            </p>
          </div>

        </div>

        <div className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 self-start">
          <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
            ID: <span className="font-semibold text-gray-700">{user.id?.slice(0, 8)}</span>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Profile