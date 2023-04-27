import { useSession } from "next-auth/react";

export default function Root() {
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  });

  return <div className="mx-10">{JSON.stringify(data)}</div>;
}

export async function getServerSideProps(context: any) {
  return {
    props: {},
    redirect: {
      permanent: true,
      destination: "/builder",
    },
  };
}
