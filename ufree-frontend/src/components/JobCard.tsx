// src/components/JobCard.tsx
type Props = {
  title: string;
  description: string;
  createdAt: string;
  actionText?: string;
  onAction?: () => void;
  children?: React.ReactNode;
};

export default function JobCard({
  title,
  description,
  createdAt,
  actionText,
  onAction,
  children,
}: Props) {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 space-y-2 hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 line-clamp-3">{description}</p>
      <p className="text-sm text-gray-400">
        Posted on {new Date(createdAt).toLocaleDateString()}
      </p>

      {children}

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-2 text-indigo-600 text-sm font-medium hover:underline"
        >
          {actionText} →
        </button>
      )}
    </div>
  );
}
