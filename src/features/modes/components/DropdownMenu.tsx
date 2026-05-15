import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DotsVerticalIcon, getIcon } from "../../../shared/ui/Icons";
import { NAV_ITEMS } from "../../../constants/navigation"

const DropdownMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOut = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      clickOut
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        clickOut
      );
  }, []);

  return (
    <div className="relative" ref={ref}>

      <button
        onClick={() => setOpen(!open)}
        className="
          p-2
          rounded-full
          hover:bg-gray-200
          transition-colors
        "
      >
        <DotsVerticalIcon className="w-6 h-6 text-gray-600" />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-2
            w-48
            bg-white
            border
            border-gray-200
            rounded-xl
            shadow-xl
            overflow-hidden
            z-50
          "
        >

          {NAV_ITEMS
            .filter((item) => item.contexts.includes("dropdown"))
            .map((item) => (
              <button
                key={item.href}
                onClick={() => {
                            navigate(item.href);
                }}
                className="dropdown-item"
              >
                {/* ICON (temporary mapping) */}
                <span className="text-xl shrink-0">
                  {getIcon(item.href)}
                </span>
          
                <span className="dropdown-text">
                  {item.label}
                </span>
              </button>
            ))}
          
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;