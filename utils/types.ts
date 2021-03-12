export type File = {
  name: string;
  updated: string;
  id: string;
  path: string;
};

export type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;
