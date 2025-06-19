export const InputBox = ({
  placeholder,
  onChange,
  label,
  type = "text"
}: {
  placeholder: string;
  label: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-lg border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
    </div>
  );
};
