import { useRouter } from "next/router";
import { useState, useEffect } from "react";

type QueryValue = string | string[] | undefined;

export function useReadyRouter<T extends QueryValue = QueryValue>(
  paramName: string,
  parser?: (value: QueryValue) => T
) {
  const router = useRouter();
  const [value, setValue] = useState<T | undefined>();

  useEffect(() => {
    if (router.isReady) {
      const rawValue = router.query[paramName];
      setValue(parser ? parser(rawValue) : (rawValue as T));
    }
  }, [router.isReady, router.query, paramName, parser]);

  return {
    value,
    isReady: router.isReady,
  };
}
