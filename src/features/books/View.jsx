import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const View = ({ user, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex justify-end mb-4">
          <Skeleton width={500} height={40} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="mb-4" count={3} width={350} height={37} />
          <Skeleton className="mb-4" count={2} width={350} height={37} />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-4">
      <div className="flex items-center mb-4 border-b-2 p-2 border-[#d8dbdd]">
        <span
          className={`ml-auto inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
            user.status === 1
              ? "bg-green-50 text-green-700 ring-green-600/20"
              : "bg-red-50 text-red-700 ring-red-600/20"
          }`}
        >
          <span
            className={`inline-block w-2 h-2 mr-1 ${
              user.status === 1 ? "bg-green-500" : "bg-red-500"
            } rounded-full`}
          ></span>
          {user.status === 1 ? "Active" : "Inactive"}
        </span>

        <span className="ml-3 font-bold text-gray-700">Created At:</span>
        <span className="ml-2 text-gray-500">
          {new Date(user._created * 1000).toLocaleString()}
        </span>

        <span className="ml-6 font-bold text-gray-700">Updated At:</span>
        <span className="ml-2 text-gray-500">
          {new Date(user._modified * 1000).toLocaleString()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <span className="text-sm font-bold text-gray-700 uppercase">
            First Name:
          </span>
          <span className="text-sm text-gray-600 ml-2">{user.firstName}</span>
        </div>
        <div className="col-span-1">
          <span className="text-sm font-bold text-gray-700 uppercase">
            Last Name:
          </span>
          <span className="text-sm text-gray-600 ml-2">{user.lastName}</span>
        </div>
        <div className="col-span-1">
          <span className="text-sm font-bold text-gray-700 uppercase">
            Email:
          </span>
          <span className="text-sm text-gray-600 ml-2">{user.email}</span>
        </div>
        <div className="col-span-1">
          <span className="text-sm font-bold text-gray-700 uppercase">
            Age:
          </span>
          <span className="text-sm text-gray-600 ml-2">{user.age}</span>
        </div>
        <div className="col-span-1">
          <span className="text-sm font-bold text-gray-700 uppercase">
            Company:
          </span>
          <span className="text-sm text-gray-600 ml-2">
            {user.company || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};
