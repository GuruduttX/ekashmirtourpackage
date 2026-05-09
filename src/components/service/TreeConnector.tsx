export default function TreeConnector({ isFirst }: { isFirst?: boolean }) {
  return (
    <div className="hidden lg:flex w-full flex-col items-center">
      {/* Center drop line coming from above (or from badge) */}
      <div className={`w-[2px] ${isFirst ? "h-6" : "h-10"} bg-sky-200`} />

      {/* Horizontal Branching Line */}
      <div className="w-[75%] relative h-8">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-sky-200" />

        {/* Four vertical drops hitting the center of each card */}
        <div className="flex justify-between h-full w-full">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-[2px] h-full bg-sky-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
