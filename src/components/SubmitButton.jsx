"use client";

import { useFormStatus } from "react-dom";

const SubmitButton = ({ action }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={action}
      className="bg-indigo-600 text-slate-50 text-lg w-full mt-4 py-3 px-6 rounded-md place-self-center hover:bg-indigo-500 active:bg-indigo-700 transition-colors duration-150 disabled:bg-slate-300"
    >
      {pending ? "Submitting" : "Subscribe"}
    </button>
  );
};

export default SubmitButton;
