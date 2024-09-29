import Skeleton from "react-loading-skeleton";

export default function EditSkeleton() {
  return (
    <div className="mx-auto p-2 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Skeleton height={45} count={3} className="mb-4" />
        <Skeleton height={45} count={3} className="mb-4" />
        <Skeleton height={45} count={3} className="mb-4" />
      </div>
      <Skeleton height={20} width={50} className="mb-4" />
      <Skeleton height={30} width={60} />
    </div>
  );
}
