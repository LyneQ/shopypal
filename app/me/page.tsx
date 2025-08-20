import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

// Ensure Node.js runtime for server component accessing DB-backed auth
export const runtime = "nodejs";

export default async function MePage() {
  const hdrs = await headers();
  const session = await auth.api.getSession({ headers: hdrs });
  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">My Account</h1>
      {session ? (
        <div className="space-y-2">
          <p><strong>ID:</strong> {session.user.id}</p>
          {session.user.name && <p><strong>Name:</strong> {session.user.name}</p>}
          {session.user.email && <p><strong>Email:</strong> {session.user.email}</p>}
          {session.user.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="avatar" src={session.user.image} className="w-16 h-16 rounded-full" />
          )}
          <form action="/api/auth/sign-out" method="post">
            <button className="border px-3 py-1 rounded hover:cursor-pointer hover:underline" type="submit">Sign out</button>
          </form>
        </div>
      ) : (
        <div className="space-y-3">
          <p>You are not signed in.</p>
          <p className="text-sm opacity-70">Please sign-in to have access to this page</p>
        </div>
      )}
    </div>
  );
}
