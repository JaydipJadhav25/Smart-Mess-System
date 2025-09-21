import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-background border overflow-hidden h-60 md:h-80 w-full p-6 transition-all duration-300 ease-out flex flex-col justify-between",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <p className="text-sm md:text-base italic text-gray-700 dark:text-gray-300">
        “{card.title}”
      </p>
      <div
        className={cn(
          "flex items-center gap-4 transition-opacity duration-300 mt-4",
          hovered === index ? "opacity-100" : "opacity-60"
        )}
      >
        <div className="h-10 w-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-sm">
          {card.avatar}
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {card.name}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">{card.batch}</div>
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type CardData = {
  title: string;
  name: string;
  batch: string;
  avatar: string;
};

export function FocusCards({ cards }: { cards: CardData[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.name}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
