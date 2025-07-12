import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ActionDispatch,
} from "react";
import type { IFolder } from "../types";
import { v4 } from "uuid";

interface IFolderContext {
  folders: {
    all: IFolder[];
    current: IFolder;
  };
  dispatch: ActionDispatch<[action: IAction]>;
  getFolders: (id: string) => IFolder[];
  history: IFolder[];
}

interface IAction {
  type: "ADD_FOLDER" | "UPDATE_FOLDER" | "SET_CURRENT";
  payload: IFolder;
}

const foldersReducer = (state: IFolderContext["folders"], action: IAction) => {
  switch (action.type) {
    case "ADD_FOLDER":
      return {
        ...state,
        all: [...state.all, action.payload],
      } as IFolderContext["folders"];

    case "UPDATE_FOLDER":
      return {
        ...state,
        all: state.all.map((folder) =>
          folder.absolutePath === action.payload.absolutePath
            ? { ...action.payload }
            : folder
        ),
      } as IFolderContext["folders"];

    case "SET_CURRENT":
      return {
        ...state,
        current: action.payload,
      } as IFolderContext["folders"];

    default:
      return state;
  }
};

const rootDir: IFolder = {
  id: v4(),
  parentId: "",
  name: "root",
  parentPath: "/",
  absolutePath: "/root/",
  files: [],
};

const initialState: IFolderContext["folders"] = {
  all: [rootDir],
  current: rootDir,
};

export const FolderContext = createContext<IFolderContext | null>(null);

export const FolderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(foldersReducer, initialState);
  const [history, setHistory] = useState<IFolder[]>([rootDir]);

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT",
      payload: state.all.find(
        (folder) => folder.absolutePath === state.current.absolutePath
      ) as IFolder,
    });
  }, [state.all]);

  useEffect(() => {
    if (state.current.parentId === "") return;

    if (state.current.parentId === history.at(-1)?.id) {
      setHistory((prev) => [...prev, state.current]);
    }
  }, [state.current]);

  const getFolders = (id: string) => {
    return state.all.filter((folder) => folder.parentId === id);
  };

  return (
    <FolderContext.Provider
      value={{ folders: state, dispatch, getFolders, history }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export const useFolders = () => {
  const { folders, dispatch, getFolders, history } = useContext(
    FolderContext
  ) as IFolderContext;

  return [folders, dispatch, getFolders, history] as const;
};
