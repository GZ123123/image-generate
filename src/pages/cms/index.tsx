import { signIn } from "next-auth/react";

export default function CMS() {
  return (
    <>
      <div>
        <button onClick={() => signIn()}>Login</button>
      </div>
    </>
  );
}
