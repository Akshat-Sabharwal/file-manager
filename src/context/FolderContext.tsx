import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { IFolder } from "../types";

interface IFolderContext {
  folders: IFolder[];
  setFolders: Dispatch<SetStateAction<IFolder[]>>;
}

const rootDir: IFolder = {
  name: "root",
  parentPath: "/",
  absolutePath: "/root/",
  folders: [],
  files: [],
  isCurrent: true,
};

export const FolderContext = createContext<IFolderContext | null>(null);

export const FolderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [folders, setFolders] = useState<IFolder[]>([rootDir]);

  return (
    <FolderContext.Provider value={{ folders, setFolders }}>
      {children}
    </FolderContext.Provider>
  );
};

export const useFolder = (options?: {
  absolutePath?: string | null;
  isCurrent?: boolean;
}) => {
  const { folders } = useContext(FolderContext) as IFolderContext;

  if (options?.absolutePath != null) {
    return folders.find(
      (folder) => folder.absolutePath === options?.absolutePath
    );
  }

  if (options?.isCurrent == true) {
    return folders.find((folder) => folder.isCurrent === true);
  }

  return folders;
};

export const updateFolder = (options: {
  absolutePath: string;
  updates: Partial<IFolder>;
}) => {
  const { setFolders } = useContext(FolderContext) as IFolderContext;

  setFolders((prev) =>
    prev.map((folder) =>
      folder.absolutePath === options?.absolutePath
        ? { ...folder, ...options?.updates }
        : folder
    )
  );
};

export const addFolder = (folderDetails: IFolder) => {
  const { setFolders } = useContext(FolderContext) as IFolderContext;

  setFolders((prev) => [...prev, folderDetails]);
};
