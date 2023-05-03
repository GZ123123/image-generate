import { Autocomplete, TextField } from "@mui/material";
import { ICInfinitySelectProps } from "./types";
import { useRef, useState } from "react";
import useSWR from "swr";
import { classNames } from "src/utils/class-names";
import { CSpinner } from "../../others/CSpinner";

export const CInfinitySelect = <TData extends {}>({
  name,
  fetch,
  value,
  placeholder,
  ...props
}: ICInfinitySelectProps<TData>) => {
  const [page, setPage] = useState(1);

  const [inputValue, setInputValue] = useState("");

  const [hasNext, setHasNext] = useState(true);

  const [options, setOptions] = useState<TData[]>([]);

  const { data, isLoading } = useSWR([name, page], () => fetch(page));

  const onValueChange = () => {};

  const onInputChange = () => {};

  const onScroll = (event: any) => {
    const { currentTarget } = event;

    console.log(currentTarget);

    if (
      Math.ceil(currentTarget.scrollTop) + currentTarget.clientHeight >=
        currentTarget.scrollHeight &&
      hasNext
    ) {
      setPage(page + 1);
    }
  };

  return (
    <Autocomplete
      className={classNames("")}
      inputValue={inputValue}
      options={options}
      value={value}
      renderInput={(params) => (
        <TextField
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading && <CSpinner />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      ListboxProps={{
        sx: { maxHeight: "260px" },
        onScroll,
      }}
      onChange={onValueChange}
      onInputChange={onInputChange}
    />
  );
};
