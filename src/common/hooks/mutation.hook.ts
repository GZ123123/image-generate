import { useState } from "react";

export const useMutation = <RData>(fn: (...params: any) => RData) => {
  const [isLoading, setLoading] = useState<boolean>();

  const mutation = async (
    ...params: Parameters<typeof fn>
  ): Promise<ReturnType<typeof fn>> => {
    setLoading(true);
    try {
      const res = await fn(...params);

      return res;
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, mutation };
};
