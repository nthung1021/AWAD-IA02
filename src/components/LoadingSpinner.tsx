export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8 text-gray-400">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
      <span className="ml-2 text-sm">Loading…</span>
    </div>
  );
}
