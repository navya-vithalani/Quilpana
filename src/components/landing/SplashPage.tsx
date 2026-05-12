import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { motion, AnimatePresence } from "framer-motion";

interface SplashPageProps {
  onEnter?: () => void;
}

const SplashPage: React.FC<SplashPageProps> = ({ onEnter }) => {

  const sceneRef = useRef<HTMLDivElement>(null);

  const [clicked, setClicked] = useState(false);

  const [synapseStage, setSynapseStage] = useState(1);

  /* ========================================
     PHYSICS BACKGROUND
  ======================================== */

  useEffect(() => {

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
    } = Matter;

    const engine = Engine.create();
    engine.gravity.y = 0;
    engine.constraintIterations = 2;
    engine.positionIterations = 10;
    engine.velocityIterations = 10;
    engine.timing.timeScale = 1;

    const world = engine.world;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const render = Render.create({
      element: sceneRef.current!,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
      },
    });

    /* Walls */

    const walls = [
      Bodies.rectangle(width / 2, -20, width, 40, {
        isStatic: true,
        render: { visible: false },
      }),

      Bodies.rectangle(width / 2, height + 20, width, 40, {
        isStatic: true,
        render: { visible: false },
      }),

      Bodies.rectangle(-20, height / 2, 40, height, {
        isStatic: true,
        render: { visible: false },
      }),

      Bodies.rectangle(width + 20, height / 2, 40, height, {
        isStatic: true,
        render: { visible: false },
      }),
    ];

    Composite.add(world, walls);




    /* ========================================
   CENTRAL COLLIDERS
======================================== */

const centerX = width / 2;

const mascotCollider = Bodies.circle(
  centerX,
  height / 2 - 160,
  90,
  {
    isStatic: true,
    render: {
      visible: false,
    },
  }
);

const logoCollider = Bodies.rectangle(
  centerX,
  height / 2 - 30,
  320,
  110,
  {
    isStatic: true,
    render: {
      visible: false,
    },
  }
);

const textCollider = Bodies.rectangle(
  centerX,
  height / 2 + 80,
  460,
  120,
  {
    isStatic: true,
    render: {
      visible: false,
    },
  }
);

Composite.add(world, [
  mascotCollider,
  logoCollider,
  textCollider,
]);


    /* Shapes */
const colors = [
  "#8C7AE6",
  "#6F5DD3",
  "#8EDAE5",
  "#E6C26A",
  "#CFA6FF",
  "#7ED0DD",
];

for (let i = 0; i < 42; i++) {

  const size = Math.random() * 10 + 6;

  const x = Math.random() * width;
  const y = Math.random() * height;

  const color =
    colors[Math.floor(Math.random() * colors.length)];

  const randomShape = Math.floor(Math.random() * 5);

  let shape;

const commonOptions = {
  restitution: 1,
  friction: 0,
  frictionStatic: 0,
  frictionAir: 0,
  inertia: Infinity,
  render: {
    fillStyle: "transparent",
    strokeStyle: color,
    lineWidth: 2,
  },
};

  switch (randomShape) {

    /* Circle */

    case 0:
      shape = Bodies.circle(
        x,
        y,
        size,
        commonOptions
      );
      break;

    /* Triangle */

    case 1:
      shape = Bodies.polygon(
        x,
        y,
        3,
        size,
        commonOptions
      );
      break;

    /* Square */

    case 2:
      shape = Bodies.rectangle(
        x,
        y,
        size * 2,
        size * 2,
        commonOptions
      );
      break;

    /* Pentagon */

    case 3:
      shape = Bodies.polygon(
        x,
        y,
        5,
        size,
        commonOptions
      );
      break;

    /* Hexagon */

    default:
      shape = Bodies.polygon(
        x,
        y,
        6,
        size,
        commonOptions
      );
  }

  Matter.Body.setVelocity(shape, {
    x: (Math.random() - 0.5) * 5,
    y: (Math.random() - 0.5) * 5,
  });

  Matter.Body.setAngularVelocity(
    shape,
    (Math.random() - 0.5) * 0.08
  );

  Composite.add(world, shape);
}

const runner = Runner.create();

Matter.Events.on(engine, "beforeUpdate", () => {

  Composite.allBodies(world).forEach((body) => {

    if (body.isStatic) return;

    const speed = body.speed;

    /* Prevent slowing down too much */

    if (speed < 2) {

      Matter.Body.setVelocity(body, {
        x: body.velocity.x * 1.4,
        y: body.velocity.y * 1.4,
      });

    }

  });

});

Runner.run(runner, engine);

Render.run(render);

    return () => {
      Render.stop(render);
      Engine.clear(engine);
      Runner.stop(runner);

      render.canvas.remove();
    };

  }, []);

  /* ========================================
     CLICK SEQUENCE
  ======================================== */

  const handleClick = () => {

    if (clicked) return;

    setClicked(true);

    /* Eyes open */
    setSynapseStage(2);

    /* Jump phase */
    setTimeout(() => {
      setSynapseStage(3);
    }, 350);

    /* Enter app */
    setTimeout(() => {
      onEnter?.();
    }, 2600);
  };

  return (

    <div
      onClick={handleClick}
      className="fixed inset-0 z-[999] overflow-hidden bg-soft-gradient cursor-pointer"
    >

      {/* Physics layer */}

      <div
        ref={sceneRef}
        className="absolute inset-0 opacity-90"
      />

      {/* Decorative floating symbols */}

<div className="absolute inset-0 overflow-hidden pointer-events-none">

  {/* Squiggle */}

  <motion.div
    className="absolute top-[18%] left-[22%] text-[rgba(180,160,255,0.32)]"
    animate={{
      y: [0, -20, 0],
      rotate: [0, 8, -8, 0],
    }}
    transition={{
      duration: 9,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <svg width="90" height="40" viewBox="0 0 90 40">
      <path
        d="M5 20 Q20 5 35 20 T65 20 T85 20"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  </motion.div>

  {/* Arrow */}

  <motion.div
    className="absolute bottom-[22%] left-[12%] text-[rgba(142,218,229,0.28)]"
    animate={{
      y: [0, 16, 0],
      rotate: [0, -6, 6, 0],
    }}
    transition={{
      duration: 11,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <svg width="70" height="70" viewBox="0 0 70 70">
      <path
        d="M10 35 H55"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      <path
        d="M40 20 L55 35 L40 50"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </motion.div>

  {/* Arc */}

  <motion.div
    className="absolute top-[60%] right-[18%] text-[rgba(230,194,106,0.20)]"
    animate={{
      y: [0, -12, 0],
      rotate: [0, 12, -12, 0],
    }}
    transition={{
      duration: 13,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <svg width="90" height="90" viewBox="0 0 90 90">
      <path
        d="M20 70 A30 30 0 1 1 70 70"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  </motion.div>

</div>

      {/* Ambient blur */}

      <div className="absolute inset-0">

        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[rgba(125,102,214,0.22)] blur-3xl animate-ambient"></div>

        <div className="absolute bottom-[-10%] right-[-10%] w-[360px] h-[360px] rounded-full bg-[rgba(95,189,205,0.18)] blur-3xl animate-ambient"></div>

      </div>

      {/* Main content */}

      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">

        {/* Synapse */}

        <motion.img
          src={
            synapseStage === 1
              ? "/brain-closed.png"
              : synapseStage === 2
              ? "/brain-open.png"
              : "/brain-jump.png"
          }
          alt="Synapse"
          className="w-32 md:w-40 mb-8 select-none pointer-events-none"
          animate={
            synapseStage === 3
              ? {
                  y: -260,
                  scale: 0.7,
                  rotate: -10,
                }
              : {
                  y: [0, -10, 0],
                }
          }
          transition={{
            duration: synapseStage === 3 ? 0.4 : 4,
            repeat: synapseStage === 3 ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Logo */}

        <motion.img
          src="/quilpana-logo.png"
          alt="Quilpana Logo"
          className="w-56 md:w-72 mb-5"
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        />

        {/* Title */}

        <motion.h1
          className="text-6xl md:text-8xl font-black tracking-tight text-[var(--text-main)]"
          initial={{
            opacity: 0,
            letterSpacing: "0.25em",
          }}
          animate={{
            opacity: 1,
            letterSpacing: "0.03em",
          }}
          transition={{
            duration: 1.1,
            delay: 0.2,
          }}
        >
          Quilpana
        </motion.h1>

        {/* Subtitle */}

        <motion.p
          className="mt-6 text-lg md:text-2xl text-[var(--text-soft)]"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
        >
          Possibility to Reality
        </motion.p>

      </div>

      {/* SHUTTER */}

      <AnimatePresence>

        {clicked && (

          <motion.div
            className="absolute inset-0 z-50 origin-top bg-[linear-gradient(180deg,#7f4ad1_0%,#5d3fa8_100%)]"

            initial={{
              scaleY: 0,
            }}

            animate={{
              scaleY: [0, 1, 1, 0],
            }}

            transition={{
              duration: 1.8,
              times: [0, 0.3, 0.7, 1],
              ease: "easeInOut",
            }}
          />

        )}

      </AnimatePresence>

    </div>
  );
};

export default SplashPage;