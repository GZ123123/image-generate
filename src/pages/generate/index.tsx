import { useState } from "react";
import { MGeneratePage } from "src/modules/generate";

interface IGenerateProps {}

export default function Generate(prop: IGenerateProps) {
  const [data, setData] = useState<string>("");

  return <MGeneratePage value={data} onChange={setData} />;
}

export const getServerSideProps = () => {
  return { props: {} };
};
