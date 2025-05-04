import { getSubs } from "@/lib/subscriptions";
import { IoIosArrowForward } from "react-icons/io";
import { Subscribe } from "@/components/SubscribeForm";

import Link from "next/link";

export default async function Home({ searchParams }) {
  const { updated } = await searchParams;
  return (
    <main className="min-h-full py-12 grid gap-y-14">
      <section className="[&>*+*]:mt-8">
        <h1 className="text-4xl font-bold cursor-default">Newsletter</h1>
        <Subscribe />
      </section>
      <section className="border-t border-slate-100 py-4">
        <Subscribers updated={updated} />
      </section>
    </main>
  );
}

// SUBSCRIBERS SECTION
export function Subscribers({ updated }) {
  return (
    <article className="grid gap-y-6">
      <h2 className="text-xl font-bold cursor-default">Subscribers</h2>
      <SubscribersList updated={updated} />
    </article>
  );
}

// SUBSCRIBERS LIST
export async function SubscribersList({ updated }) {
  const subscribers = await getSubs();

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 md:gap-4">
      {subscribers.map((sub) => (
        <li
          data-updated={sub.id.toString() === updated}
          key={sub.id}
          className="data-[updated=true]:outline data-[updated=true]:outline-indigo-100 rounded-md"
        >
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
