import Skeleton from 'react-loading-skeleton'

export default function EditSkeleton() {
  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <Skeleton height={30} className="col-span-2" />
        <Skeleton height={30} className="col-span-2" />
        <Skeleton height={30} className="col-span-1" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
        <Skeleton height={30} className="col-span-2" />
        <Skeleton height={30} className="col-span-1" />
        <Skeleton height={30} className="col-span-1" />
      </div>
      <Skeleton height={20} width={70} className="mb-4" />
      <Skeleton height={30} width={70} />
    </div>
  )
}
