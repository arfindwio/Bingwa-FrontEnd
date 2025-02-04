export const AdminDataSkeleton = ({ tdCount }) => {
  const tdElements = [];

  for (let i = 0; i < tdCount; i++) {
    tdElements.push(
      <td key={i} className="px-4 py-3">
        <div className="h-5 w-full rounded bg-slate-100"></div>
      </td>,
    );
  }

  return <>{tdElements}</>;
};
