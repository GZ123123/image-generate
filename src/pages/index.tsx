import { withSession } from "src/utils/session";

export default function Root() {
  return <div className="mx-10">{null}</div>;
}

export const getStaticProps = withSession(async (context: any) => {
  return {
    props: {},
  };
});
