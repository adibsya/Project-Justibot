import React, { useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion"


const GRADIENT_COLORS = ["#D9CEC5", "#E0D6CC", "#E8DFD6", "#F0E8E0"]

const Tagline = () => {

    const color = useMotionValue(GRADIENT_COLORS[0])

    useEffect(() => {
      animate(color, GRADIENT_COLORS, {
        ease: "easeInOut",
        duration: 10,
        repeat: Infinity,
        repeatType: "mirror",
      })
    }, [color])
  
    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 100%, #ffffff 50%, ${color})`
    const border = useMotionTemplate`1px solid ${color}`
    const boxShadow = useMotionTemplate`0px 2px 12px ${color}`
  

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-background px-4 py-24 text-gray-900"
    >
    </motion.section>
  )
}

export default Tagline