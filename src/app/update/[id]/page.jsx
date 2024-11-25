import { getSubById, patchSub, deleteSub } from "@/lib/subscriptions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SlArrowLeft } from "react-icons/sl";
import Link from "next/link";

export default async function page({ params }) {
  const { id } = await params;
  const subscriber = await getSubById(id);

  return (
    <main className="min-h-full py-12 grid gap-y-14">
      <section className="max-w-xl w-full place-self-center">
        <header className="[&>*+*]:mt-4">
          <Link
            href="/"
            className="text-slate-800 flex gap-2 items-center hover:text-slate-600"
          >
            <SlArrowLeft size="10" />
            Back
          </Link>
          <h1 className="text-3xl font-bold cursor-default">
            Edit subscription
          </h1>
        </header>
        <EditSubscription {...subscriber} />
      </section>
    </main>
  );
}

export async function EditSubscription({ id, name, email }) {
  async function submitEditedData(formData) {
    "use server";

    const data = {
      id: id,
      name: formData.get("name"),
      email: formData.get("email"),
    };

    await patchSub(data);

    revalidatePath("/");
    redirect("/");
  }

  async function unsubscribe() {
    "use server";
    await deleteSub(id);
    revalidatePath("/");
    redirect("/");
  }

  return (
    <form
      action={submitEditedData}
      className="grid gap-y-4 m-auto py-8 md:py-10"
    >
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-x-2 items-center">
        <label htmlFor="id-name" className="text-lg font-semibold">
          Name
        </label>
        <input
          id="id-name"
          type="text"
          name="name"
          defaultValue={name}
          className="col-span-3 sm:col-span-5 border border-slate-200 rounded-sm py-1 px-2"
        />
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-x-2 items-center">
        <label htmlFor="id-email" className="text-lg font-semibold">
          Email
        </label>
        <input
          id="id-email"
          type="email"
          name="email"
          defaultValue={email}
          className="col-span-3 sm:col-span-5 border border-slate-200 rounded-sm py-1 px-2"
        />
      </div>
      <div className="flex gap-4">
        <button
          formAction={unsubscribe}
          className="bg-slate-200 text-lg font-semibold w-full mt-4 py-3 px-6 rounded-md place-self-center hover:bg-slate-100 active:bg-slate-300 transition-colors duration-150"
        >
          Delete
        </button>
        <button className="bg-indigo-600 text-slate-50 text-lg font-semibold w-full mt-4 py-3 px-6 rounded-md place-self-center hover:bg-indigo-500 active:bg-indigo-700 transition-colors duration-150">
          Update
        </button>
      </div>
    </form>
  );
}
