import { useState } from "react";
import { MGeneratePage } from "src/modules/generate";
import { IMGenerateData } from "src/modules/generate/type";

interface IGenerateProps {}

export default function Generate(prop: IGenerateProps) {
  const [data, setData] = useState<IMGenerateData[]>([]);

  return <MGeneratePage value={data} onChange={setData} />;
}

export const getServerSideProps = () => {
  return { props: {} };
};
