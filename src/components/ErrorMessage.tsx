type Props = {
  children: React.ReactNode;
};

function ErrorMessage({ children }: Props) {
  return (
    <p className="bg-red-50 text-red-600 uppercase text-sm font-bold text-center">
      {children}
    </p>
  );
}

export default ErrorMessage;
