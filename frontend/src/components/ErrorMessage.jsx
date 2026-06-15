function ErrorMessage({ message }) {
  return (
    <div className="mt-6 bg-red-900 text-red-200 p-4 rounded-lg">
      ⚠️ {message}
    </div>
  );
}

export default ErrorMessage;