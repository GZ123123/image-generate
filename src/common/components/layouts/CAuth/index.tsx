import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";

export const CAuth = ({ children }: PropsWithChildren) => {
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {},
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
};
