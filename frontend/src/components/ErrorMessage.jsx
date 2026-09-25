function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="error" role="alert">
      <strong>Erro:</strong> {message}
    </div>
  );
}

export default ErrorMessage;
