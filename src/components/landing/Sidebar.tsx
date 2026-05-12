import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGamepad, FaPaintBrush, FaUser, FaHome } from "react-icons/fa";



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

    {/* HOME */}

    <button
      onClick={() => navigate("/")}
      className="sidebar-item"
    >
      <FaHome className="text-xl shrink-0" />

      <span className="sidebar-text">
        Home
      </span>
    </button>

    {/* PLAYER */}

    <button
      onClick={() => navigate("/player")}
      className="sidebar-item"
    >
      <FaGamepad className="text-xl shrink-0" />

      <span className="sidebar-text">
        Player Mode
      </span>
    </button>

    {/* CREATOR */}

    <button
      onClick={() => navigate("/creator")}
      className="sidebar-item"
    >
      <FaPaintBrush className="text-xl shrink-0" />

      <span className="sidebar-text">
        Creator Studio
      </span>
    </button>

    {/* PROFILE */}

    <button
      onClick={() =>
        navigate(loggedIn ? "/profile" : "/login")
      }
      className="sidebar-item"
    >
      <FaUser className="text-xl shrink-0" />

      <span className="sidebar-text">
        Profile
      </span>
    </button>

  </div>

</motion.div>
  )
}

export default Sidebar;