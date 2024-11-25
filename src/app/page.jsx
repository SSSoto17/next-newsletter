import { getSubs, postSub } from "@/lib/subscriptions";
import { revalidatePath } from "next/cache";
import { IoIosArrowForward } from "react-icons/io";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-full py-12 grid gap-y-14">
      <section className="[&>*+*]:mt-8">
        <h1 className="text-4xl font-bold cursor-default">Newsletter</h1>
        <Subscribe />
      </section>
      <section className="border-t border-slate-100 py-4">
        <Subscribers />
      </section>
    </main>
  );
}

export async function Subscribe() {
  async function submitData(formData) {
    "use server";

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
    };

    await postSub(data);

    revalidatePath("/");
  }

  return (
    <form
      action={submitData}
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
          className="col-span-2 sm:col-span-3 border border-slate-200 rounded-sm py-1 px-2"
        />
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-2 items-center">
        <label htmlFor="id-email" className="text-lg font-semibold">
          Email
        </label>
        <input
          id="id-email"
          type="email"
          name="email"
          className="col-span-2 sm:col-span-3 border border-slate-200 rounded-sm py-1 px-2"
        />
      </div>
      <button className="bg-indigo-600 text-slate-50 text-lg w-full mt-4 py-3 px-6 rounded-md place-self-center hover:bg-indigo-500 active:bg-indigo-700 transition-colors duration-150">
        Subscribe
      </button>
    </form>
  );
}

export function Subscribers() {
  return (
    <article className="grid gap-y-6">
      <h2 className="text-xl font-bold cursor-default">Subscribers</h2>
      <SubscribersList />
    </article>
  );
}

export async function SubscribersList() {
  const subscribers = await getSubs();

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 md:gap-4">
      {subscribers.map((sub) => (
        <li key={sub.id}>
          <Link
            href={`/update/${sub.id}`}
            className="bg-white drop-shadow-md px-12 py-14 sm:px-6 sm:py-10 md:py-12 md:px-10 rounded-md grid grid-cols-4 gap-x-2 items-center"
          >
            <article className="col-span-3">
              <h3 className="text-xl font-semibold">{sub.name}</h3>
              <p className="text-slate-800">{sub.email}</p>
            </article>
            <IoIosArrowForward
              size="32"
              className="text-slate-400 justify-self-end"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
