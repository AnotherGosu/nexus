import { createContext, useContext } from "react";
import useSWR from "swr";
import axios, { AxiosResponse } from "axios";
import { File } from "utils/types";

interface Folder {
  files: File[];
  folderPath: string;
  mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
  createFolderReq: (name: string) => Promise<AxiosResponse<any>>;
  uploadFilesReq: (formData: FormData) => Promise<AxiosResponse<any>>;
  downloadFileReq: (path: string) => Promise<AxiosResponse<any>>;
  deleteFileReq: (path: string) => Promise<AxiosResponse<any>>;
  copyFileReq: (
    path: string,
    name: string,
    ext: string
  ) => Promise<AxiosResponse<any>>;
  renameFileReq: (
    path: string,
    name: string,
    ext: string,
    newName: string
  ) => Promise<AxiosResponse<any>>;
}

const FolderContext = createContext<Folder | null>(null);
export const useFolder = () => useContext(FolderContext);

interface Props {
  initialData: File[];
  folderPath: string;
}

const fetcher = (url: string, folderPath: string) =>
  axios.get(url, { params: { folderPath } }).then((res) => res.data);

export const FolderProvider: React.FC<Props> = ({
  children,
  initialData,
  folderPath,
}) => {
  const { data: files, mutate } = useSWR(
    ["/api/storage/folder", folderPath],
    fetcher,
    {
      initialData,
    }
  );

  const uploadFilesReq = (formData: FormData) =>
    axios.post("/api/storage/file", formData, {
      params: { folderPath },
      headers: { "Content-Type": "multipart/form-data" },
    });

  const downloadFileReq = (path: string) =>
    axios.get("/api/storage/file/", {
      params: { path },
      responseType: "blob",
    });

  const deleteFileReq = (path: string) =>
    axios.delete("/api/storage/folder", { data: { path } });

  const createFolderReq = (name: string) =>
    axios.post("/api/storage/folder", {
      folderPath,
      name,
    });

  const copyFileReq = (path: string, name: string, ext: string) =>
    axios.put("/api/storage/folder", { path, name, ext });

  const renameFileReq = (
    path: string,
    name: string,
    ext: string,
    newName: string
  ) => axios.patch("/api/storage/folder", { path, name, ext, newName });

  return (
    <FolderContext.Provider
      value={{
        files,
        folderPath,
        mutate,
        uploadFilesReq,
        downloadFileReq,
        createFolderReq,
        deleteFileReq,
        copyFileReq,
        renameFileReq,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};
