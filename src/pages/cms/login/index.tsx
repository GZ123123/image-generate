import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

export default function SignIn() {
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <label>
        Username
        <input name="username" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Sign in</button>
    </form>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   // const csrfToken = await getCsrfToken(context);

//   // console.log(csrfToken);

//   return {
//     // props: { csrfToken },
//   };
// }
