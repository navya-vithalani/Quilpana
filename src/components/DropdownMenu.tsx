import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DotsVerticalIcon } from "./Icons";

interface DropdownMenuProps {
  isLoggedIn: boolean;

  onLogin: () => void;
  onLogout: () => void;

  onOpenPremiumModal?: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isLoggedIn,
  onLogin,
  onLogout,
  onOpenPremiumModal,
}) => {
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

          {isLoggedIn ? (
            <>

              <button
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
                className="
                  w-full
                  text-left
                  px-4
                  py-3
                  hover:bg-gray-100
                  transition-colors
                "
              >
                Profile
              </button>

              {onOpenPremiumModal && (
                <button
                  onClick={() => {
                    onOpenPremiumModal();
                    setOpen(false);
                  }}
                  className="
                    w-full
                    text-left
                    px-4
                    py-3
                    hover:bg-gray-100
                    transition-colors
                  "
                >
                  Premium
                </button>
              )}

              <button
                onClick={() => {
                  onLogout();
                  setOpen(false);
                }}
                className="
                  w-full
                  text-left
                  px-4
                  py-3
                  hover:bg-gray-100
                  transition-colors
                  text-red-500
                "
              >
                Logout
              </button>

            </>
          ) : (
            <button
              onClick={() => {
                onLogin();
                setOpen(false);
              }}
              className="
                w-full
                text-left
                px-4
                py-3
                hover:bg-gray-100
                transition-colors
              "
            >
              Login
            </button>
          )}

        </div>
      )}
    </div>
  );
};

export default DropdownMenu;