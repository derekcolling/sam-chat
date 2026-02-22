import { motion } from "framer-motion";

export const Greeting = () => {
  return (
    <div
      className="mx-auto mt-4 flex size-full max-w-3xl flex-col justify-center px-4 md:mt-16 md:px-8"
      key="overview"
    >
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Downtown Santa Monica"
          className="size-[72px] rounded-full shadow-md"
          src="/images/dtsm-logo-circle.jpeg"
        />
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="font-semibold text-xl md:text-2xl"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
      >
        Hey, I'm Sam
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-xl text-muted-foreground md:text-2xl"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
      >
        Your guide to everything Downtown Santa Monica. Ask me about restaurants, shopping, parking, getting around, or what's happening this weekend. What can I help you find?
      </motion.div>
    </div>
  );
};
