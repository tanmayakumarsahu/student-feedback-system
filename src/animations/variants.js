// Page transitions
export const pageVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.4 }
  }
};

// Stagger container for lists
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

// Individual item in staggered list
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Heading animation with word stagger
export const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Stat card hover effect
export const cardHoverVariants = {
  initial: { y: 0 },
  hover: { 
    y: -8,
    transition: { type: "spring", stiffness: 200, damping: 10 }
  }
};

// Button micro-interaction
export const buttonVariants = {
  hover: {
    scale: 1.03,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.96,
    transition: { duration: 0.1 }
  }
};

// Input focus animation
export const inputFocusVariants = {
  focus: {
    boxShadow: "0 0 0 2px rgba(156, 163, 175, 0.3)",
    transition: { duration: 0.2 }
  }
};

// Fade in animation
export const fadeInVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

// Floating animation (for images)
export const floatingVariants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      repeat: Infinity,
      duration: 5,
      ease: "easeInOut"
    }
  }
};

// Navbar slide down
export const navbarVariants = {
  hidden: { y: -60, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Modal/overlay entrance
export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

// Slide from right
export const slideInVariants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Pulse animation for badges
export const pulseVariants = {
  animate: {
    opacity: [1, 0.6, 1],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut"
    }
  }
};
