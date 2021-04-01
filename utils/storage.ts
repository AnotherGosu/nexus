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
    //last prefix of file is it's fullName
    const lastPrefix = prefixes[prefixes.length - 1];
    const fullName = lastPrefix ? lastPrefix : prefixes[prefixes.length - 2];

    //set folder extension to "/"
    const [name, ext = "/"] = fullName.split(/\.(?=[^\.]+$)/);

    //cut uid from the path
    const filePath = prefixes.slice(1).join("/");

    return { name, ext, path: filePath, lastEdited, id };
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

export async function copyFile(path: string, name: string, ext: string) {
  //copy single file
  if (ext !== "/") {
    return bucket.file(path).copy(path.replace(name, `${name}-copy`));
  }

  //copy folder
  const [files] = await bucket.getFiles({
    autoPaginate: false,
    prefix: path,
  });

  const folderName = name;
  return Promise.all(
    files.map(async (file) => {
      const { name } = file.metadata;
      const copyName = name.replace(folderName, `${folderName}-copy`);
      return file.copy(copyName);
    })
  );
}

export async function renameFile(
  path: string,
  name: string,
  ext: string,
  newName: string
) {
  //rename single file
  if (ext !== "/") {
    return bucket.file(path).rename(path.replace(name, newName));
  }

  //rename folder
  const [files] = await bucket.getFiles({
    autoPaginate: false,
    prefix: path,
  });

  const folderName = name;
  return Promise.all(
    files.map(async (file) => {
      const { name } = file.metadata;
      return file.rename(name.replace(folderName, newName));
    })
  );
}
