import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { label: "Spark", path: "/spark" },
  { label: "Manifesto", path: "/manifesto" },
  { label: "Profile", path: "/profile" },
  { label: "Contact", path: "/contact" },
];

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <motion.header
      className="quil-navbar"
      initial={{
        opacity: 0,
        y: -30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {/* LEFT */}

      <div className="navbar-left">
        <NavLink to="/" className="navbar-logo-wrap">
          <img
            src="/quilpana-logo.png"
            alt="Quilpana"
            className="navbar-logo"
          />
        </NavLink>
      </div>

      {/* CENTER */}

      <div className="navbar-center">

        {navItems.map((item, index) => {
          const active =
            location.pathname === item.path;

          return (
            <React.Fragment key={item.path}>

              <NavLink
                to={item.path}
                className={`
                  navbar-link
                  ${active ? "active" : ""}
                `}
              >
                <motion.span
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {item.label}
                </motion.span>
              </NavLink>

              {index !== navItems.length - 1 && (
                <div className="navbar-divider" />
              )}

            </React.Fragment>
          );
        })}

      </div>

      {/* RIGHT */}

      <div className="navbar-right">

        <NavLink
          to="/player"
          className="mode-button play-mode"
        >
          PLAY
        </NavLink>

        <NavLink
          to="/creator"
          className="mode-button create-mode"
        >
          CREATE
        </NavLink>

      </div>
    </motion.header>
  );
};

export default Navbar;