import { useFolders } from "../context/FolderContext";
import type { IFolder } from "../types";

interface IFolderProps {
  absolutePath: string;
}

export const Folder: React.FC<IFolderProps> = ({ absolutePath }) => {
  const [folders, dispatch] = useFolders();
  const folder = folders.all.find(
    (folder) => folder.absolutePath === absolutePath
  ) as IFolder;

  //   console.log(folder);

  return (
    <div
      className="w-fit min-w-48 rounded-lg bg-cyan-700 text-white px-4 py-2.5 cursor-pointer"
      onClick={() => dispatch({ type: "SET_CURRENT", payload: folder })}
    >
      {folder.name}
    </div>
  );
};
