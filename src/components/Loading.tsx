import { motion } from "framer-motion";

interface LoadingProps {
  message?: string;
}

export function Loading({
  message = "Loading...",
}: LoadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center gap-4 py-12"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
        className="h-10 w-10 rounded-full border-4 border-blue-500 border-t-transparent"
      />

      <motion.p
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.8,
        }}
        className="text-gray-500"
      >
        {message}
      </motion.p>
    </motion.div>
  );
}