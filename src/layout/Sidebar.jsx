import { LayoutDashboard, ChevronLeft } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const Sidebar = ({ isCollapsed, onToggle }) => {
  const { user, role } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const AdminPages = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      link: "/admin/dashboard",
    },
  ]

  const UserPages = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      link: "/for-you",
    },
    {
      name: "Workspaces",
      icon: <LayoutDashboard size={20} />,
      link: "/your-workspaces",
    },
     {
      name: "Boards",
      icon: <LayoutDashboard size={20} />,
      link: "/your-boards",
    },
  ]

  const pagesToDisplay = role === "admin" ? AdminPages : UserPages

  return (
    <div
      className={`fixed left-0 top-0 z-30 flex flex-col h-screen bg-[#001919] transition-[width] duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo Area */}
      <div className="flex items-center mt-6 mb-6 px-4 overflow-hidden">
        <Link
          to={role === "admin" ? "/admin/dashboard" : "/for-you"}
          className="flex items-center focus:outline-none w-full"
        >
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-9 h-9 drop-shadow-md transition-transform duration-300 hover:scale-105 rounded-lg"
            />
          </div>

          <h2
            className={`text-white font-bold text-xl tracking-wide whitespace-nowrap transition-all duration-300 ${
              isCollapsed
                ? "opacity-0 -translate-x-4 w-0 ml-0"
                : "opacity-100 translate-x-0 w-auto ml-3"
            }`}
          >
            TaskForge
          </h2>
        </Link>
      </div>

      <div className="px-4 mb-4">
        <div className="h-px w-full bg-darkest" />
      </div>

      <ul className="flex flex-col gap-2 px-3 flex-1 overflow-y-auto no-scrollbar overflow-x-hidden">
        {pagesToDisplay.map((pg) => {
          return (
            <li key={pg.name}>
              <NavLink to={pg.link}>
                {({ isActive }) => (
                  <div
                    className={`flex items-center p-3 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? "bg-primary/20 border-2 border-primary text-white shadow-lg shadow-primary/20"
                        : "text-accent hover:bg-darkest hover:text-white"
                    }`}
                  >
                    <span
                      className={`shrink-0 w-8 flex justify-center transition-transform duration-300 ${
                        isActive
                          ? "scale-110 text-white"
                          : "text-light group-hover:scale-110 group-hover:text-white"
                      }`}
                    >
                      {pg.icon}
                    </span>
                    <span
                      className={`font-medium whitespace-nowrap transition-all duration-300 ${
                        isCollapsed
                          ? "opacity-0 translate-x-4 w-0 ml-0"
                          : "opacity-100 translate-x-0 w-auto ml-3"
                      }`}
                    >
                      {pg.name}
                    </span>
                  </div>
                )}
              </NavLink>
            </li>
          )
        })}
      </ul>

      <div className="p-4 mt-auto border-t border-darkest overflow-hidden">
        <button
          onClick={onToggle}
          className="w-full flex justify-center items-center bg-darkest/50 hover:bg-secondary text-accent hover:text-white p-3 rounded-xl border border-secondary/50 shadow-sm active:scale-95 transition-all duration-300"
        >

          <ChevronLeft
            className={`w-5 h-5 transition-transform duration-500 ease-in-out ${
              isCollapsed ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
    </div>
  )
}

export default Sidebar