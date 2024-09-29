import Skeleton from 'react-loading-skeleton'

export default function ViewSkeleton() {
  return (
    <div className="p-4">
    <div className="flex justify-end mb-4">
      <Skeleton width={500} height={40} />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Skeleton className="mb-4" count={3} width={300} height={37} />
      <Skeleton className="mb-4" count={3} width={300} height={37} />
      <Skeleton className="mb-4" count={3} width={300} height={37} />
    </div>
      <Skeleton className="mb-4" count={1} height={50} />
  </div>
  )
}
