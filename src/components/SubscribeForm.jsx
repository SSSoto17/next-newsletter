"use client";

import SubmitButton from "./SubmitButton";

import { useActionState } from "react";
import { submitData } from "@/actions";
import { MdError } from "react-icons/md";

// SIGN UP
export function Subscribe() {
  const [state, formAction, isPending] = useActionState(submitData);

  return (
    <form
      action={formAction}
      className="grid gap-y-4 max-w-sm m-auto p-12 md:p-16 bg-white drop-shadow-md rounded-xl"
    >
      <h2 className="text-2xl font-bold cursor-default">Sign Up</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-2 items-center">
        <label htmlFor="id-name" className="text-lg font-semibold">
          Name
        </label>
        <input
          id="id-name"
          type="text"
          name="name"
          defaultValue={state?.name}
          disabled={isPending}
          className="col-span-2 sm:col-span-3 border border-slate-200 rounded-sm py-1 px-2 disabled:bg-slate-2 00"
        />
        <p className="col-span-full text-slate-500 flex gap-2 items-center">
          {state?.errors.name && <MdError className="text-red-400" size="18" />}{" "}
          {state?.errors.name}
        </p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-2 items-center">
        <label htmlFor="id-email" className="text-lg font-semibold">
          Email
        </label>
        <input
          id="id-email"
          type="email"
          name="email"
          defaultValue={state?.email}
          className="col-span-2 sm:col-span-3 border border-slate-200 rounded-sm py-1 px-2"
        />
        <p className="col-span-full text-slate-500 flex gap-2 items-center">
          {state?.errors.email && (
            <MdError className="text-red-400" size="18" />
          )}{" "}
          {state?.errors.email}
        </p>
      </div>
      <SubmitButton />
      <p>{state?.message}</p>
    </form>
  );
}
