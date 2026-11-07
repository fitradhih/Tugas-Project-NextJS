type Props = {
  title: string;
  description?: string;
  actionLabel?: string;
};

export default function EmptyState({ title, description, actionLabel }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
        {actionLabel && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{actionLabel}</button>}
    </div>
    );
}