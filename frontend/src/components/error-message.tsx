interface ErrorMessageProps {
  error: string | boolean | undefined;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  const isValid = error === true || error === undefined;
  const textColor = isValid ? "text-green-500" : "error";
  return <span className={textColor}>{error}</span>;
};
export default ErrorMessage;
