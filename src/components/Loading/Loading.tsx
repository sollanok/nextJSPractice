import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <motion.img
        src="/LoadingCrash.png"
        alt="Loading..."
        className="w-100 h-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{ opacity: { duration: 1.5 }, rotate: { repeat: Infinity, duration: 5, ease: "linear" } }}
      />
      <motion.p
        className="text-black text-[30px] mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        Loading...
      </motion.p>
    </div>
  );
}