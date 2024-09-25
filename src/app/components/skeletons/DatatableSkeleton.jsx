import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DataTableSkeleton = () => {
  return (
    <div className="skeleton-loader">
        <div className="flex gap-6">
      <Skeleton width={80} height={35} />
      <Skeleton width={80} height={35} />
        </div>
        <Skeleton height={38} width={250} className="mt-4 float-right me-3" />
      <table className='w-full text-center h-full'>
        <thead>
          <tr>
            <th colSpan={7}><Skeleton height={50} /></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Skeleton count={7} height={40} width={35} /></td>
            <td><Skeleton count={7} height={40} width={150} /></td>
            <td><Skeleton count={7} height={40} width={200} /></td>
            <td><Skeleton count={7} height={40} width={35} /></td>
            <td><Skeleton count={7} height={40} width={150} /></td>
            <td><Skeleton count={7} height={40} width={50} /></td>
            <td><Skeleton count={7} height={40} width={150} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DataTableSkeleton;