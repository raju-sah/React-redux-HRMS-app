import "react-loading-skeleton/dist/skeleton.css";
import { ageGroupOptions } from "../../books/bookscategory/AgeGroup";
import ViewSkeleton from "../../../app/components/skeletons/ViewSkeleton";

export const View = ({ data, isLoading }) => {
  if (isLoading || !data) return <ViewSkeleton />;

  return (
    <div className="p-4">
      <div className="flex items-center mb-4 border-b-2 p-2 border-[#d8dbdd]">
        <span
          className={`ml-auto inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
            data.status === true
              ? "bg-green-50 text-green-700 ring-green-600/20"
              : "bg-red-50 text-red-700 ring-red-600/20"
          }`}
        >
          <span
            className={`inline-block w-2 h-2 mr-1 ${
              data.status === true ? "bg-green-500" : "bg-red-500"
            } rounded-full`}
          ></span>
          {data.status === true ? "Active" : "Inactive"}
        </span>

        <span className="ml-3 font-bold text-gray-700">Created At:</span>
        <span className="ml-2 text-gray-500">
          {new Date(data._created * 1000).toLocaleString()}
        </span>

        <span className="ml-6 font-bold text-gray-700">Updated At:</span>
        <span className="ml-2 text-gray-500">
          {new Date(data._modified * 1000).toLocaleString()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <div className="text-sm font-bold text-gray-700 uppercase">
            Category Name
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {data.name}
          </span>
        </div>
        <div className="col-span-1">
          <div className="text-sm font-bold text-gray-700 uppercase mb-2">
            Age Group
          </div>
          <div className="flex flex-wrap">
            {data.ageGroup.map((groupIndex) => (
              <span
                key={groupIndex}
                className="bg-purple-400 text-gray-900 py-1 px-2 rounded-md mr-1"
              >
                {ageGroupOptions[groupIndex]?.label || "N/A"}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-sm font-bold text-gray-700 uppercase">
          Description
        </div>
        <span className="text-sm text-gray-600 ml-2">
          {data.description || "N/A"}
        </span>
      </div>
    </div>
  );
};