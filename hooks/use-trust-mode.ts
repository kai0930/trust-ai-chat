import { TrustMode } from "@/types/trust-mode-types";
import useSWR from "swr";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json() as Promise<TrustMode | null>);
}

export default function useTrustMode() {
  const { data, error, isLoading, mutate } = useSWR("/api/trust-mode", fetcher);

  return { data, error, isLoading, mutate };
}
