
function NutritionNode() {
  return (
    <div
      className="mb-4 overflow-hidden rounded-md
                    bg-blue-50 dark:bg-background
                    border border-blue-200 dark:border-background
                    py-2"
    >
      <div
        className="whitespace-nowrap animate-marquee
                            text-[13px] font-medium tracking-wide
                            text-slate-700 dark:text-slate-300 px-4"
      >
        <span className="text-red-700 font-bold">Disclaimer:</span> This data is an AI-generated estimate for basic understanding only. These figures are based on general online data and should be used as a guide, not as exact nutritional values.
      </div>
    </div>
  )
}

export default NutritionNode