
const APIS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

async function request(path = "") {
  let lastError;
  for (const base of APIS) {
    try {
      const res = await fetch(`${base}${path}`, { cache: "no-store" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      return await res.json();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError ?? new Error("Could not reach the workout API");
}

export async function getWorkouts() {
  const data = await request();
  return Array.isArray(data) ? data : [];
}

export async function getWorkout(id) {
  const data = await request(`/${encodeURIComponent(id)}`);
  if (!data || Array.isArray(data) || !data.name) return null;
  return data;
}
