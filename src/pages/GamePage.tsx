import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {GAMES} from '../constants';
import { useNavigate } from 'react-router-dom';


const GamePage: React.FC = () => {
  console.log('Rendering GamePage');
  const { id } = useParams<{ id: string }>();
  console.log(`/games/${id}/index.html`);
  const navigate = useNavigate();
  // Map id to your actual game file path
 const gameExists = GAMES.find(game => game.id === id);
  const gameSrc = gameExists ? `/games/${id}/index.html` : null;
  const [iframeFailed, setIframeFailed] = useState(false);
  

   
 useEffect(() => {
  const handleMessage = (event: MessageEvent) => {
    const payload = event.data;
    if (!payload || typeof payload !== "object") return;

    if (payload.type === "FINISH_GAME") {
      const gameId = payload.gameId ?? id;
      navigate(`/${gameId}/feedback`);
    }
  };

  window.addEventListener("message", handleMessage);

  return () => {
    window.removeEventListener("message", handleMessage);
  };
}, [navigate, id]);

  return (
    <div className="relative w-full h-screen bg-gray-900">

      {/* EXIT BUTTON ALWAYS ON TOP */}
      <button
        onClick={() => navigate(`/${id}/feedback`)}
        className="group fixed bottom-4 right-4 z-50 w-10 h-10 
                   rounded-full bg-red-700 text-white 
                   backdrop-blur hover:bg-red-800 transition"
      >
        ✕
         <div
    className="absolute bottom-12 right-1/2 translate-x-1/2
               bg-black text-white text-xs px-2 py-1 rounded 
               border border-white whitespace-nowrap
               opacity-0 group-hover:opacity-100
               transition-opacity duration-200"
    style={{ visibility: "visible" }}
  >
    Finish&Return
  </div>
      </button>

      {/* GAME LOADING */}
      {gameSrc ? (
        <iframe
          src={gameSrc}
          className="w-full h-full border-none"
          title={id}
          allowFullScreen
          onLoad={() => console.log("Game Loaded")}
          onError={() => setIframeFailed(true)}
        />
      ) : (
      <div className="flex flex-col items-center gap-3">
        <img
          src="/placeholder-synapse.png"
          alt="Synapse confused"
          className="w-40 h-40 object-contain opacity-90"
        />
        <p className="text-lg font-semibold">Huh? This game hasn’t spawned yet!</p>
        <p className="text-sm opacity-70">Synapse is still wiring the circuits…</p>
      </div>
    )}
    </div>
  );
};



export default GamePage;