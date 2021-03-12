import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string, userId: string, prefix: string[]) =>
  axios
    .get(url, { params: { userId, prefix: prefix.join(",") } })
    .then((res) => res.data);

export default function usePrefix(
  initialData: File[],
  initialPrefix: string[],
  userId: string
) {
  return useSWR(["/api/storage", userId, initialPrefix], fetcher, {
    initialData,
  });
}
