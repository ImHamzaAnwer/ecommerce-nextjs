import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white rounded-md px-4 py-2"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-blue-900 w-screen h-screen flex items-center">
      logged in {session.user.email}
      <button
        onClick={() => signOut("google")}
        className="bg-white rounded-md px-4 py-2"
      >
        logout
      </button>
    </div>
  );
}
