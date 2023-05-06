import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { classNames } from "src/utils/class-names";
import { CSpinner } from "../../others/CSpinner";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { ICInfinitySelectProps } from "./types";
import uniqBy from "lodash.uniqby";
import useSWR from "swr";

const filter = createFilterOptions();

export const CInfinitySelectInner = <TData extends { _id: string }>(
  {
    id,
    label,
    name,
    fetch,
    value,
    initial,
    placeholder,
    multiple,
    onChange,
    onCreate,
    ...props
  }: ICInfinitySelectProps<TData>,
  ref: React.ForwardedRef<any>
) => {
  const [page, setPage] = useState(1);

  const [inputValue, setInputValue] = useState("");

  const [hasNext, setHasNext] = useState(true);

  const [options, setOptions] = useState<TData[]>(initial || []);

  const { data, isLoading } = useSWR([name, page], () => fetch(page));

  const onValueChange = async (
    _: any,
    value: (TData & { value: string })[]
  ) => {
    const last = value.pop();

    if (!last) {
      return onChange(multiple ? [] : undefined);
    }

    if (last._id) {
      onChange(value.map(({ _id }) => _id).concat(last["_id"]));
    } else {
      const res = await onCreate(last["value"]);
      if (res) {
        onChange(value.map(({ _id }) => _id).concat(res["_id"]));

        setOptions([res, ...options]);
      }
    }
  };

  const onInputChange = (_: any, v: string) => {
    if (v.includes("Thêm: ")) return v.substr("Thêm: ".length);

    setInputValue(v);
  };

  const onScroll = (event: any) => {
    const { currentTarget } = event;

    if (
      Math.ceil(currentTarget.scrollTop) + currentTarget.clientHeight >=
        currentTarget.scrollHeight &&
      hasNext
    ) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (data?.length) {
        setOptions(uniqBy(options.concat(data), "_id"));
      } else {
        setHasNext(false);
      }
    }
  }, [isLoading, data]);

  const correctValue = useMemo<any>(() => {
    if (multiple) {
      return value ? options.filter(({ _id }) => value.includes(_id)) : [];
    } else {
      return value ? options.find(({ _id }) => value === _id) : undefined;
    }
  }, [options, value]);

  const getOptionLabel = useCallback((option: any) => {
    return option["name"];
  }, []);

  const getFilterOptions = (options: any, params: any) => {
    const filtered = filter(options, params);

    const { inputValue } = params;

    const isExiting = options.some(
      (option: any) => option["name"] === inputValue
    );

    if (inputValue !== "" && !isExiting)
      filtered.push({
        name: `Thêm: ${inputValue}`,
        value: inputValue,
      });

    return filtered;
  };

  return (
    <div>
      {label && (
        <label className="capitalize" htmlFor={id}>
          {label}
        </label>
      )}
      <Autocomplete
        ref={ref}
        id={id}
        {...props}
        className={classNames("")}
        inputValue={inputValue}
        options={options}
        value={correctValue}
        multiple={multiple}
        classes={{
          inputRoot: "py-0",
          input: "asd",
        }}
        renderInput={(params) => (
          <TextField
            {...params}
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
        filterOptions={getFilterOptions}
        getOptionLabel={getOptionLabel}
        ListboxProps={{
          sx: { maxHeight: "260px" },
          onScroll,
        }}
        onChange={onValueChange}
        onInputChange={onInputChange}
      />
    </div>
  );
};

export const CInfinitySelect = forwardRef(CInfinitySelectInner);

CInfinitySelect.defaultProps = {
  initial: [],
};
