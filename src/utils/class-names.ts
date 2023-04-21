export const classNames = (...args: (boolean | string | undefined)[]) => {
  return args.filter(Boolean).join(" ");
};
