import { useRef, type Ref } from "react";

export const Overlay = () => (
  <div className="absolute top-0 left-0 h-screen w-full overflow-hidden bg-neutral-700 opacity-70 z-[997]"></div>
);

export const Modal = ({
  children,
  ref,
}: {
  children?: React.ReactNode;
  ref: Ref<HTMLDivElement>;
}) => (
  <div
    ref={ref}
    className="absolute top-0 left-0 z-[998] w-full h-screen flex justify-center items-center"
    style={{ display: "none" }}
  >
    <Overlay />
    <div className="p-6 rounded-xl bg-white min-w-96 flex flex-col justify-start items-start z-[999]">
      {children}
    </div>
  </div>
);

export const useModal = () => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const toggleVisibility = () => {
    if (modalRef.current != null)
      modalRef.current.style.display =
        modalRef.current.style.display === "none" ? "flex" : "none";
  };

  return [modalRef, toggleVisibility] as const;
};
