import React, { useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion"
import { FiArrowRight } from "react-icons/fi"
import { Link } from 'react-router-dom'

const GRADIENT_COLORS = ["#D9CEC5", "#E0D6CC", "#E8DFD6", "#F0E8E0"]

const Hero = () => {
  const color = useMotionValue(GRADIENT_COLORS[0])

  useEffect(() => {
    animate(color, GRADIENT_COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    })
  }, [color])

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #ffffff 50%, ${color})`
  const border = useMotionTemplate`1px solid ${color}`
  const boxShadow = useMotionTemplate`0px 2px 12px ${color}`

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-background px-4 py-24 text-gray-900"
    >
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="max-w-3xl bg-gradient-to-br from-black to-gray-700 bg-clip-text text-center text-2xl font-medium leading-tight text-transparent sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
          Keadilan di Layar Anda
        </h1>
        <p className="my-6 max-w-2xl text-center text-sm leading-relaxed sm:text-base sm:leading-relaxed md:text-lg md:leading-relaxed lg:text-xl lg:leading-relaxed text-textPrimary">
        Chatbot bertenaga AI yang dirancang untuk memberikan konsultasi hukum yang cepat, akurat, dan mudah diakses. Dapatkan informasi hukum, panduan dokumen, dan bantuan hukum awal kapan pun dan di mana pun.
        </p>
        <Link to="/chatbot">
          <motion.button
            style={{
              border,
              boxShadow,
            }}
            whileHover={{
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.985,
            }}
            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-secondary text-onPrimary px-4 py-2 transition-colors hover:bg-secondary/80"
          >
            Ayo Mulai
            <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
          </motion.button>
        </Link>
      </div>
    </motion.section>
  )
}

export default Hero