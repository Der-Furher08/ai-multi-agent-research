function LoadingSpinner() {
  return (
    <div className="mt-6 text-center">

      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto">
      </div>

      <p className="mt-4 text-gray-400">
        AI agents are researching...
      </p>

    </div>
  );
}

export default LoadingSpinner;