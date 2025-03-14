import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import { assets } from "../../assets/assets";

const GRADIENT_COLORS = ["#D9CEC5", "#E0D6CC", "#E8DFD6", "#F0E8E0"];
const ROTATING_WORDS = ["Fast", "Accurate", "Accessible"];

const Tagline = () => {
  const color = useMotionValue(GRADIENT_COLORS[0]);
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    animate(color, GRADIENT_COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setWordIndex((prevIndex) => (prevIndex + 1) % ROTATING_WORDS.length);
        setIsAnimating(false);
      }, 500); // Wait for animation to complete
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(intervalId);
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 100%, #FFFFFF 50%, ${color})`;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      id="tagline-section"
      style={{
        backgroundImage,
      }}
      className="relative overflow-hidden bg-background px-4 py-24 text-gray-900 min-h-screen"
    >
      <motion.div
        className="container mx-auto flex flex-col md:flex-row items-center justify-between max-w-6xl py-12 px-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div
          className="md:w-1/2 md:pr-8 mb-8 md:mb-0"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-onSurface">
            Pursuit Your Justice
            <div className="h-[1.2em] mt-2 overflow-hidden relative">
              <span
                className={`inline-block transition-all duration-500 ${
                  isAnimating
                    ? "opacity-0 transform translate-y-[-20px]"
                    : "opacity-100 transform translate-y-0"
                } text-secondary absolute`}
              >
                {ROTATING_WORDS[wordIndex]}
              </span>
            </div>
          </h2>
          <p className="text-lg md:text-lg text-textPrimary mb-6">
            We believe that everyone deserves access to justice. Our platform
            provides the tools and resources you need to understand your legal
            rights.
          </p>
        </motion.div>
        <motion.div
          className="md:w-1/2 flex justify-center"
          variants={itemVariants}
        >
          <img
            src={assets.tagline}
            alt="Justice illustration"
            className="w-1/2 max-w-sm"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Tagline;
