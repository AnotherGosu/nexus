import { bucket } from "./firebaseAdmin";
import downloadFolder from "downloads-folder";

export async function getFiles(path: string) {
  const [files] = await bucket.getFiles({
    autoPaginate: false,
    includeTrailingDelimiter: true,
    delimiter: "/",
    prefix: path,
  });

  return files.map((file) => {
    const { updated, id } = file.metadata;
    const prefixes = file.name.split("/");
    const lastEdited = new Date(updated).toLocaleString();

    //last prefix for folder is an empty string
    //last prefix for file is it's name
    const lastPrefix = prefixes[prefixes.length - 1];
    const name = lastPrefix ? lastPrefix : prefixes[prefixes.length - 2];

    //cut uid from the path
    const filePath = prefixes.slice(1).join("/");

    return { name, path: filePath, lastEdited, id };
  });
}

export function uploadFile(content: string | Buffer, path: string) {
  return bucket.file(path).save(content, { resumable: false });
}

export function dowloadFile(path: string, fileName: string) {
  return bucket.file(path).download();
  // .download({ destination: `${downloadFolder()}/${fileName}` });
}
