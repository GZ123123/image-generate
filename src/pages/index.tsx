export default function Root() {
  return <div className="mx-10"></div>;
}

export const getStaticProps = async (context: any) => {
  return {
    props: {},
  };
};
