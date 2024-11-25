const endpoint = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headersList = {
  Accept: "application/json",
  "Content-Type": "application/json",
  apikey: key,
  Prefer: "return=representation",
};

export async function getSubs() {
  const response = await fetch(endpoint, {
    method: "GET",
    headers: headersList,
  });

  const data = await response.json();
  return data;
}

export async function postSub(submittedData) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: headersList,
    body: JSON.stringify(submittedData),
  });

  const data = await response.json();
  return data;
}

export async function deleteSub(id) {
  const response = await fetch(endpoint + `?id=eq.${id}`, {
    method: "DELETE",
    headers: headersList,
  });

  const data = await response.json();
  return data;
}

export async function patchSub(editedData) {
  const response = await fetch(endpoint + `?id=eq.${editedData.id}`, {
    method: "PATCH",
    headers: headersList,
    body: JSON.stringify(editedData),
  });

  const data = await response.json();
  return data;
}

export async function getSubById(id) {
  const response = await fetch(endpoint, {
    method: "GET",
    headers: headersList,
  });

  const data = await response.json();
  return data.find((sub) => sub.id == id);
}

// let response = await fetch(
//   "https://bjygrojbelrzildufniz.supabase.co/rest/v1/subscriptions?id=eq.16",
//   {
//     method: "PATCH",
//     body: bodyContent,
//     headers: headersList,
//   }
// );

// let data = await response.text();
// console.log(data);
