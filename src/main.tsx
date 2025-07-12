import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Manager } from "./Manager.tsx";
import { FolderContextProvider } from "./context/FolderContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FolderContextProvider>
      <Manager />
    </FolderContextProvider>
  </StrictMode>
);
