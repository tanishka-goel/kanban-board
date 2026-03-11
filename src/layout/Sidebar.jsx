import { User, LayoutDashboard,  ChevronRight,ChevronLeft, LogOutIcon, Users, PackageCheckIcon } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


const Sidebar = ({ isCollapsed, onToggle }) => {
    const {user,role} = useSelector((state)=>state.auth)
    //console.log("Role from sidebar :", role)
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

    ]

    const pagesToDisplay = role ==="admin" ? AdminPages : UserPages

  return (
     <div
      className={`fixed left-0 top-0 z-30 flex flex-col h-screen bg-[#001919]  transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
    
    <div className="flex mt-6  mb-4">
        <Link
          to={role==="admin"? "/admin/dashboard" : "/for-you"}
          className="flex items-center gap-4 px-6 w-full focus:outline-none"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="w-8 h-8 shrink-0 drop-shadow-md transition-transform duration-300 hover:scale-105 rounded-lg"
          />
        
          {!isCollapsed && (
            <h2 className="text-secondary font-bold text-lg tracking-wide animate-in fade-in duration-300">
              FAKE STORE
            </h2>
          )}
        </Link>
      </div>

       <div className="px-4 mb-4">
        <div className="h-px w-full bg-slate-800/60" />
      </div>

      <ul className="flex flex-col gap-2 px-3 flex-1 overflow-y-auto no-scrollbar">
        {pagesToDisplay.map ((pg)=>{

             return (
            <li key={pg.name}>
              <NavLink
                to={pg.link}
                className={({isActive})=>`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-custom-green/20 text-custom-green shadow-sm"
                    : "text-secondary hover:bg-primary/50 hover:text-custom-bg/70"
                }`}
              >
                <span
                  className={({isActive})=>`shrink-0 transition-transform duration-200 ${
                    isActive ? "scale-110" : "group-hover:scale-110"
                  } ${isActive ? "text-custom-bg" : "text-secondary group-hover:text-slate-200"}`}
                >
                  {pg.icon}
                </span>
                {!isCollapsed && (
                  <span className="font-medium whitespace-nowrap animate-in fade-in duration-300">
                    {pg.name}
                  </span>
                )}
              </NavLink>
            </li>
          );
        })}

      </ul>

       <div className="p-4 mt-auto  border-t border-slate-800/60">

        <button
          onClick={onToggle}
          className="w-full flex border-secondary justify-center items-center bg-custom-wine/20 hover:bg-primary/30 text-secondary p-3 rounded-xl border  shadow-sm active:scale-95 transition-all duration-200 "
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 transition-transform" />
          ) : (
            <ChevronLeft className="w-5 h-5 transition-transform" />
          )}
        </button>

        
      </div>

    </div>
  )
}

export default Sidebar