import type { Dispatch, SetStateAction } from "react";

export const Radio = ({
  label,
  value,
  state,
  setState,
}: {
  label: string;
  value: string;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <label className="text-xl px-3 py-2 rounded-md border-2 border-cyan-700 flex gap-3 bg-cyan-700/30 has-checked:bg-cyan-700/60 text-neutral-900">
      {label}
      <input
        type="radio"
        value={value}
        checked={value === state}
        onChange={(e) => setState(e.target.value)}
        name="type"
        className="appearance-none peer"
      />
      <span className="my-auto border-2 rounded-full h-4 w-4 border-cyan-700 bg-white peer-checked:bg-cyan-700/60"></span>
    </label>
  );
};
