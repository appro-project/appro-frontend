/**
 * Shared query key and server-safe fetcher for a single project (SSR).
 */

export const projectByIdQueryKey = (id: number) =>
  [`projects-${id}`] as const;

const getApiBase = () => {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) throw new Error("NEXT_PUBLIC_API_URL is not set");
  return `${base.replace(/\/$/, "")}/api/v1`;
};

/** Server-safe: use in Server Components or prefetchQuery. */
export async function fetchProjectById(id: number) {
  const res = await fetch(`${getApiBase()}/project/${id}`, {
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		next: { revalidate: 60 },
	})
  if (!res.ok) throw new Error(`Failed to fetch project ${id}: ${res.status}`);
  return res.json();
}
