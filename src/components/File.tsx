export const File = ({ name }: { name: string }) => {
  return (
    <div className="bg-cyan-700/30 rounded-lg h-32 w-28 p-2 pb-1 flex flex-col justify-start items-center">
      <span className="w-full h-full bg-white rounded-md"></span>
      <p className="text-cyan-700/90 text-xl mt-1">{name}</p>
    </div>
  );
};
