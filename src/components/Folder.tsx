import { updateFolder, useFolder } from "../context/FolderContext";
import type { IFolder } from "../types";

interface IFolderProps {
  name: string;
  path: string;
}

export const Folder: React.FC<IFolderProps> = ({ name, path }) => {
  const folder = useFolder({ absolutePath: path }) as IFolder;

  const updateCurrentFolder = () => {
    updateFolder({
      absolutePath: folder.absolutePath,
      updates: { isCurrent: true },
    });

    updateFolder({
      absolutePath: (useFolder({ isCurrent: true }) as IFolder).absolutePath,
      updates: { isCurrent: false },
    });
  };

  return (
    <div
      className="w-fit min-w-48 rounded-lg bg-cyan-700 text-white px-4 py-2.5 cursor-pointer"
      onClick={updateCurrentFolder}
    >
      {name}
    </div>
  );
};
