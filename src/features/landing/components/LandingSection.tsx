import React from "react";
import { motion } from "framer-motion";


const LandingSection: React.FC<{
  title: string;
  text: string;
  image: string;
  reverse?: boolean;
  buttonText?: string;
  dark?: boolean;
}> = ({
  title,
  text,
  image,
  reverse = false,
  buttonText,
  dark = false
}) => {

  return (

    <motion.section
initial={{
  opacity: 0,
  rotateX: 25,
  y: 120,
  scale: 0.92,
}}

whileInView={{
  opacity: 1,
  rotateX: 0,
  y: 0,
  scale: 1,
}}

whileHover={{
  scale: 1.02,
}}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`
          snap-section
          perspective-[1000px]
        min-h-screen
        flex
        items-center
        justify-center
        px-8
        md:px-20
        py-24
        ${dark ? "bg-[var(--bg-secondary)]" : "bg-[var(--bg-main)]"}
      `}
    >

      <div
        className={`
          max-w-7xl
          w-full
          grid
          grid-cols-1
          md:grid-cols-2
          gap-20
          items-center
          ${reverse ? "md:[&>*:first-child]:order-2" : ""}
        `}
      >

        {/* IMAGE */}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >

          <img
            src={image}
            alt={title}
            className="
              w-full
              max-w-[520px]
              rounded-[2.5rem]
              border-[12px]
              border-white
              shadow-2xl
              object-cover
            "
          />

        </motion.div>

        {/* TEXT */}

        <div className="flex flex-col gap-8">

          <p className="uppercase tracking-[0.3em] text-sm text-[var(--text-soft)]">
            Quilpana
          </p>

          <h2 className="text-5xl md:text-6xl font-black leading-tight text-[var(--text-main)]">
            {title}
          </h2>

          <p className="text-lg leading-relaxed text-[var(--text-soft)] max-w-xl">
            {text}
          </p>

          {buttonText && (

            <button className="primary-button w-fit">
              {buttonText}
            </button>

          )}

        </div>

      </div>

    </motion.section>

  );

};

export default LandingSection;