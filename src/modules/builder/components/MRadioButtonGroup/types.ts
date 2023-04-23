export interface IMRadioButton {
  value: boolean;

  options: string[];

  onChange: (current: boolean) => void;
}
