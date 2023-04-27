export interface IMGeneratePageProps {
  value: IMGenerateData[];

  onChange: (args: IMGenerateData[]) => void;
}

export interface IMGenerateData {
  url: string;

  text: string;
}
