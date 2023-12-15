import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="flex justify-between">
        <h2 className="text-blue-900">
          Hello, <b>{session.user.name}</b>
        </h2>

        <div className="bg-gray-200 overflow-hidden rounded-lg flex gap-1">
          <img className="w-6 h-6" src={session.user.image} />
          <span className="px-2">{session.user.name}</span>
        </div>
      </div>
    </Layout>
  );
}
