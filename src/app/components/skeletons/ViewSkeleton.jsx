import Skeleton from 'react-loading-skeleton'

export default function ViewSkeleton() {
  return (
    <div className="p-4">
    <div className="flex justify-end mb-4">
      <Skeleton width={500} height={40} />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton className="mb-4" count={3} width={350} height={37} />
      <Skeleton className="mb-4" count={3} width={350} height={37} />
    </div>
  </div>
  )
}
