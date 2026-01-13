interface SettingCardProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

export default function SettingCard({
  title,
  description,
  enabled,
  onToggle,
}: SettingCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center justify-between">
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>

      <button
        onClick={onToggle}
        className={`relative w-14 h-8 rounded-full transition-colors ${
          enabled ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
            enabled ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );
}
