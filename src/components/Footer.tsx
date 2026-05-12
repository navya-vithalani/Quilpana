import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="qp-footer">
      <div className="qp-footer-inner">

        {/* LEFT */}
        <div className="flex flex-col gap-3">
          <img src="/quilpana-logo.png" className="w-20" />

          <p className="text-sm opacity-70 max-w-xs">
            Quilpana is where ideas stop being ideas and start behaving like they matter.
          </p>
        </div>

        {/* CENTER */}
        <div className="flex flex-col gap-2">
          <h4 className="font-bold">Explore</h4>

          <button onClick={() => navigate("/player")}>Play</button>
          <button onClick={() => navigate("/creator")}>Create</button>
          <button onClick={() => navigate("/profile")}>Profile</button>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold">Connect</h4>

          <div className="flex gap-4 text-xl">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>

      </div>

      <div className="text-center text-xs opacity-50 mt-10">
        © {new Date().getFullYear()} Quilpana
      </div>
    </footer>
  );
};

export default Footer;