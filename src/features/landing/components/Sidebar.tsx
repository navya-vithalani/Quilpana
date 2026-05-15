import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getIcon } from "../../../shared/ui/Icons";
import { NAV_ITEMS } from "../../../constants/navigation";



const Sidebar: React.FC = () => {

  const navigate = useNavigate();
  const loggedIn = true; // placeholder auth

  return(
<motion.div
  className={`
    fixed
    left-0
    top-0
    h-screen
    z-50
    hidden
    md:flex
    items-center
    transition-all
    duration-700
  `}

  initial={{
  opacity: 0,
  x: -100,
}}

animate={{
  opacity: 1,
  x: 0,
}}

transition={{
  duration: 1.5,
  ease: "easeOut",
}}
>

  <div
    className="
      ml-4
      h-[85vh]
      w-[72px]
      hover:w-[210px]
      transition-all
      duration-500
      rounded-3xl
      bg-white/10
      backdrop-blur-xl
      border
      border-white/10
      shadow-2xl
      flex
      flex-col
      justify-center
      px-4
      overflow-hidden
      group
    "
  >

{NAV_ITEMS
  .filter((item) => item.contexts.includes("sidebar"))
  .map((item) => (
    <button
      key={item.href}
      onClick={() => {
                  navigate(item.href);
      }}
      className="sidebar-item"
    >
      {/* ICON (temporary mapping) */}
      <span className="text-xl shrink-0">
        {getIcon(item.href)}
      </span>

      <span className="sidebar-text">
        {item.label}
      </span>
    </button>
  ))}

  </div>
</motion.div>
)}

export default Sidebar;