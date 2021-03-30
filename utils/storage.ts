import { bucket } from "./firebaseAdmin";

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

    //last prefix of folder is an empty string
    //last prefix of file is it's name
    const lastPrefix = prefixes[prefixes.length - 1];
    const name = lastPrefix ? lastPrefix : prefixes[prefixes.length - 2];

    //cut uid from the path
    const filePath = prefixes.slice(1).join("/");

    return { name, path: filePath, lastEdited, id };
  });
}

export function uploadFiles(files: any[], path: string) {
  return Promise.all(
    files.map(async (file) => {
      const fileName = `${path}/${file.originalname}`;
      const content = file.buffer;
      return bucket.file(fileName).save(content, { resumable: false });
    })
  );
}

export function createFolder(path: string) {
  return bucket.file(path).save("", { resumable: false });
}

export function dowloadFile(path: string) {
  return bucket.file(path).download();
}

export async function deleteFile(path: string) {
  const [files] = await bucket.getFiles({
    autoPaginate: false,
    prefix: path,
  });

  return Promise.all(files.map(async (file) => file.delete()));
}
