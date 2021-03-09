import axios from "axios";
import path from "path";
import { mutate } from "swr";
import firebaseAmin from "./firebaseAdmin";

const bucket = firebaseAmin.storage().bucket();

export async function getFiles(userId: string, prefix: string[]) {
  const directory = prefix.length ? prefix.join("/") + "/" : "";
  const [objects] = await bucket.getFiles({
    autoPaginate: false,
    includeTrailingDelimiter: true,
    delimiter: "/",
    prefix: directory,
  });
  const structuredObjects = objects.map((obj) => {
    const { updated, id } = obj.metadata;
    const name = obj.name.replace(directory, "").replace("/", "");
    return { name, updated, id };
  });
  return prefix.length ? structuredObjects.slice(1) : structuredObjects;
}

export function createFolder(name: string) {
  const folderName = name + "/";
  const folder = path.resolve(process.cwd(), "utils", "folder.json");
  return bucket.upload(folder, { destination: folderName });
}

export const uploadFiles = async (files = []) => {
  if (files.length) {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files[]", file, file.name);
    });

    const response = await axios.post("/api/storage", formData, {
      headers: { "content-type": "multipart/form-data" },
    });

    mutate("/api/storage");
  }
};
