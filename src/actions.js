"use server";

import { getSubs, postSub } from "@/lib/subscriptions";
import { wait } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function submitData(prev, formData) {
  await wait(400);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
  };
  const errors = {};

  if (!data.name) {
    errors.name = "Name is required";
  }
  if (!data.name.length === 1) {
    errors.name = "Name is too short";
  }
  if (!data.email || !data.email.includes(".")) {
    errors.email = "Valid email required";
  }
  if (errors.name || errors.email) {
    return { succes: false, errors, name: data.name, email: data.email };
  }

  const subscribers = await getSubs();
  const existingEmail = subscribers.find(
    (signup) => signup.email === data.email
  );

  if (existingEmail) {
    return {
      succes: false,
      errors: { email: "Email already exists" },
      name: data.name,
      email: data.email,
    };
  }

  const res = await postSub(data);

  if (res) {
    revalidatePath("/");
    return { success: true, errors: {}, message: "Thanks for subscribing!" };
  } else {
    return { success: false, errors: {}, message: "Subscription failed." };
  }
}
