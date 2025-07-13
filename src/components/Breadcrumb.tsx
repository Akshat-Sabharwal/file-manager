import { useFolders } from "../context/FolderContext";

export const Breadcrumb = () => {
  const [__, dispatch, _, history] = useFolders();

  console.log(history);

  return (
    <div className="flex gap-3">
      {history.slice(0, -1).map((folder, idx) => (
        <>
          <p
            className="text-2xl text-cyan-700/90 cursor-pointer"
            onClick={() => dispatch({ type: "SET_CURRENT", payload: folder })}
          >
            {folder.name}
          </p>
          {idx < history.length - 2 ? (
            <p className="text-2xl text-cyan-700/90">{">"}</p>
          ) : null}
        </>
      ))}
    </div>
  );
};
