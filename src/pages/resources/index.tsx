import { signIn } from "next-auth/react";

export default function Resources() {
  return (
    <>
      <button className="text-green-600" onClick={() => signIn()}>
        Sign In
      </button>
    </>
  );
}
