import { useState } from "react";
import { Folder } from "./components/Folder";
import { Modal, useModal } from "./components/Modal";
import { Radio } from "./components/Radio";
import { Button } from "./components/Button";
import { File } from "./components/File";
import { useFolders } from "./context/FolderContext";
import { v4 } from "uuid";
import { Breadcrumb } from "./components/Breadcrumb";

export const Manager = () => {
  const [folders, dispatch, getFolders] = useFolders();
  const [modalRef, toggleVisibility] = useModal();
  const [selectedOption, setSelectedOption] = useState<string>("file");
  const [itemName, setItemName] = useState<string>("");

  const createItem = () => {
    if (!itemName.trim() || !folders.current) return;

    if (selectedOption === "folder") {
      let repetitionFlag;

      folders.all
        .filter(
          (fol) =>
            fol.parentId ===
            folders.all.find((folder) => folder.id === folders.current.id)?.id
        )
        .forEach((fol) =>
          fol.name === itemName ? (repetitionFlag = true) : null
        );

      if (repetitionFlag == true) {
        alert(itemName + " already exists!");
        return;
      } else {
        dispatch({
          type: "ADD_FOLDER",
          payload: {
            id: v4(),
            parentId: folders.current.id,
            name: itemName,
            parentPath: folders.current.absolutePath,
            absolutePath: `${folders.current.absolutePath}${itemName}/`,
            files: [],
          },
        });

        return;
      }
    }

    if (selectedOption === "file") {
      dispatch({
        type: "UPDATE_FOLDER",
        payload: {
          ...folders.current,
          files: [...(folders.current.files as string[]), itemName],
        },
      });
      return;
    }

    setItemName("");
  };

  return (
    <>
      <div className="w-full h-screen overflow-hidden flex justify-center items-center p-6 bg-cyan-100">
        <div className="w-full h-full flex flex-col justify-start items-start p-8 rounded-xl bg-white">
          {folders.all && (
            <>
              <div className="flex w-full justify-between">
                <h1 className="text-cyan-700/90 text-4xl">
                  {folders.current?.name}
                </h1>
                {folders.current.parentId === "" ? null : <Breadcrumb />}
              </div>
              {getFolders(folders.current.id).length == 0 &&
              folders.current?.files?.length == 0 ? (
                <div className="flex w-full h-full justify-center items-center text-3xl text-cyan-700/60">
                  No folder or file
                </div>
              ) : (
                <>
                  <div className="flex gap-4 flex-col mt-8">
                    <p className="text-cyan-700/60 text-2xl">Folders</p>
                    <div className="flex gap-4 flex-wrap">
                      {getFolders(folders.current.id).map((folder) => (
                        <Folder
                          key={folder.absolutePath}
                          absolutePath={folder.absolutePath}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 flex-col mt-8">
                    <p className="text-cyan-700/60 text-2xl">Files</p>
                    <div className="flex gap-4 flex-wrap">
                      {folders.current?.files?.map((file) => (
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
