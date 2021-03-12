import axios from "axios";
import { resolve } from "path";
import { mutate } from "swr";
import { bucket } from "./firebaseAdmin";
import { File } from "@google-cloud/storage/build/src/file";

function structureFiles(files: File[]) {
  return files.map((file) => {
    const { updated, id } = file.metadata;
    const prefixes = file.name.split("/");

    //last prefix is an empty string
    const name = prefixes[prefixes.length - 2];

    //cut uid from the path
    const filePath = prefixes.slice(1).join("/");

    return { name, path: filePath, updated, id };
  });
}

export async function getFiles(path: string) {
  const [files] = await bucket.getFiles({
    autoPaginate: false,
    includeTrailingDelimiter: true,
    delimiter: "/",
    prefix: path,
  });

  return structureFiles(files);
}

export async function getRecentFiles(path: string) {
  const [files] = await bucket.getFiles({
    autoPaginate: false,
    prefix: path,
  });

  return structureFiles(files);
}

export function createFolder(path: string) {
  const emptyFolder = resolve(process.cwd(), "utils", "folder.json");
  return bucket.upload(emptyFolder, { destination: path });
}

// export function uploadFile(file: File, path: string) {
//   return bucket.upload(file.name, { destination: path });
// }

export async function uploadFiles(files = []) {
  if (files.length) {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files[]", file, file.name);
    });

    const response = await axios.post("/api/storage/file", formData, {
      headers: { "content-type": "multipart/form-data" },
    });
  }
}
