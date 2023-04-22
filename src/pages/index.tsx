import { useSession } from "next-auth/react";

export default function Root() {
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      console.log("un auth");
      // The user is not authenticated, handle it here.
    },
  });

  return <div className="mx-10">{JSON.stringify(data)}</div>;
}
