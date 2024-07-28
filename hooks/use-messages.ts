import { Message } from "@/types/chat-types";
import useSWR from "swr";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json() as Promise<Message[] | null>);
}

export function useMessages() {
  const { data, error, isLoading, mutate } = useSWR("/api/messages", fetcher);

  return { data, error, isLoading, mutate };
}
