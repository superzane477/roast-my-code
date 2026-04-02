import { motion } from 'framer-motion'

interface RoastButtonProps {
  onClick: () => void
  disabled: boolean
  disabledReason?: string
}

export default function RoastButton({ onClick, disabled, disabledReason }: RoastButtonProps) {
  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        onClick={onClick}
        disabled={disabled}
        className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-orange-500/25"
      >
        Roast My Code
      </motion.button>
      {disabled && disabledReason && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-6 left-0 right-0 text-center text-xs text-yellow-400"
        >
          {disabledReason}
        </motion.p>
      )}
    </div>
  )
}
