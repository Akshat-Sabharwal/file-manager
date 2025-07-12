import { useEffect, useState } from "react";
import { addFolder, updateFolder, useFolder } from "./context/FolderContext";
import { Folder } from "./components/Folder";
import type { IFolder } from "./types";
import { Modal, useModal } from "./components/Modal";
import { Radio } from "./components/Radio";
import { Button } from "./components/Button";
import { File } from "./components/File";

export const Manager = () => {
  const folder = useFolder();
  const [modalRef, toggleVisibility] = useModal();

  const [currentFolder] = useState<IFolder>(
    useFolder({ isCurrent: true }) as IFolder
  );
  const [selectedOption, setSelectedOption] = useState<string>("file");
  const [itemName, setItemName] = useState<string>("");

  const createItem = () => {
    if (!itemName.trim() || !currentFolder) return;

    if (selectedOption === "folder") {
      addFolder({
        name: itemName,
        parentPath: currentFolder.absolutePath,
        absolutePath: `${currentFolder.absolutePath}/${itemName}/`,
        isCurrent: false,
        files: [],
        folders: [],
      });
    }

    if (selectedOption === "file") {
      updateFolder({
        absolutePath: currentFolder.absolutePath,
        updates: { files: [itemName] },
      });
    }

    setItemName("");
  };

  useEffect(() => console.log(currentFolder), []);

  return (
    <>
      <div className="w-full h-screen overflow-hidden flex justify-center items-center p-6 bg-cyan-100">
        <div className="w-full h-full flex flex-col justify-start items-start p-8 rounded-xl bg-white">
          {folder && (
            <>
              <h1 className="text-cyan-700/90 text-4xl">
                {currentFolder?.name}
              </h1>
              {currentFolder?.folders?.length == 0 &&
              currentFolder?.files?.length == 0 ? (
                <div className="flex w-full h-full justify-center items-center text-3xl text-cyan-700/60">
                  No folder folder
                </div>
              ) : (
                <>
                  <div className="flex gap-4 flex-col mt-8">
                    <p className="text-cyan-700/60 text-2xl">Folders</p>
                    <div className="flex gap-4 flex-wrap">
                      {currentFolder?.folders?.map((folder) => (
                        <Folder
                          key={folder.absolutePath}
                          name={folder.name}
                          path={folder.absolutePath}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 flex-col mt-8">
                    <p className="text-cyan-700/60 text-2xl">Files</p>
                    <div className="flex gap-4 flex-wrap">
                      {currentFolder?.files?.map((file) => (
                        <File name={file} />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          <Button
            className="absolute bottom-16 right-16"
            onClick={toggleVisibility}
          >
            + Create
          </Button>
        </div>
      </div>
      <Modal ref={modalRef}>
        <div className="flex gap-4 mb-4 w-full">
          <Radio
            label="File"
            value="file"
            state={selectedOption}
            setState={setSelectedOption}
          />
          <Radio
            label="Folder"
            value="folder"
            state={selectedOption}
            setState={setSelectedOption}
          />
        </div>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder={`${selectedOption} name`}
          className="border-2 border-neutral-400 text-neutral-900 outline-none rounded-md px-3 py-2 w-full mb-8"
        />
        <div className="flex gap-4 justify-end w-full">
          <Button
            onClick={() => {
              createItem();
              toggleVisibility();
            }}
          >
            Create {selectedOption}
          </Button>
          <Button
            onClick={() => {
              toggleVisibility();
              setItemName("");
            }}
            className="bg-red-700/10 border-red-700 hover:bg-red-700/40 active:bg-red-700/60"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
