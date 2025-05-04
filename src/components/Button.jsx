"use client";

const variants = {
  primary: "",
  secondary:
    "bg-slate-100 text-slate-600 drop-shadow-md font-semibold text-lg mt-4 py-3 px-12 rounded-md place-self-center hover:drop-shadow-lg active:drop-shadow-sm active:text-slate-700 active:bg-slate-200 transition-colors duration-150",
};

const Button = ({ label, action }) => {
  return (
    <button
      onClick={action}
      className="bg-slate-100 text-slate-600 drop-shadow-md font-semibold text-lg mt-4 py-3 px-12 rounded-md place-self-center hover:drop-shadow-lg active:drop-shadow-sm active:text-slate-700 active:bg-slate-200 transition-colors duration-150"
    >
      {label}
    </button>
  );
};

export default Button;
