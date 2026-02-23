/**
 * Shared query key and server-safe fetcher for projects (SSR).
 * Use fetchAllProjects in server components; useGetAllProjects on client.
 */

export const PROJECTS_QUERY_KEY = ["projects"] as const;

const getApiBase = () => {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) throw new Error("NEXT_PUBLIC_API_URL is not set");
  return `${base.replace(/\/$/, "")}/api/v1`;
};

/** Server-safe: use in getServerSideProps, Server Components, or prefetchQuery. */
export async function fetchAllProjects() {
  const res = await fetch(`${getApiBase()}/project`, {
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		next: { revalidate: 60 }
		// cache: "no-store",
	})
  if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`);
  return res.json();
}
