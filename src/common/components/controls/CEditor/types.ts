export interface ICEditor {
  id: string;
  label?: string;
  name: string;
  value?: string;
  onChange: (data: string) => void;
}
