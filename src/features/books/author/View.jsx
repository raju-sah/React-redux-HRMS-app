import "react-loading-skeleton/dist/skeleton.css";
import { countries } from "../../../enums/Country";
import PopularityBadge from "../../../app/components/PopularityBadge";
import ViewSkeleton from "../../../app/components/skeletons/ViewSkeleton";

export const View = ({ data, isLoading }) => {

  if (isLoading || !data) return <ViewSkeleton />;

  return (
    <div className="p-4">
      <div className="flex items-center mb-4 border-b-2 p-2 border-[#d8dbdd]">
        <span
          className={`ml-auto inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
            data.status === 1
              ? "bg-green-50 text-green-700 ring-green-600/20"
              : "bg-red-50 text-red-700 ring-red-600/20"
          }`}
        >
          <span
            className={`inline-block w-2 h-2 mr-1 ${
              data.status === 1 ? "bg-green-500" : "bg-red-500"
            } rounded-full`}
          ></span>
          {data.status === 1 ? "Active" : "Inactive"}
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

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="col-span-2">
          <div className="text-sm font-bold text-gray-700 uppercase">
            Full Name
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {data.firstName + " " + data.lastName || "N/A"}
          </span>
        </div>
        <div className="col-span-2">
          <div className="text-sm font-bold text-gray-700 uppercase">
            Nationality
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {countries.find((country) => country.code === data.nationality)
              ?.name || "N/A"}
          </span>
        </div>
        <div className="col-span-1">
          <div className="text-sm font-bold text-gray-700 uppercase">
            Popularity
          </div>
          <span className="text-sm text-gray-600 ml-2">
            <PopularityBadge popularity={data.popularity} />
          </span>
        </div>

        <div className="col-span-1">
          <div className="text-sm font-bold text-gray-700 uppercase">
            Date of Birth
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {new Date(data.dob).toLocaleDateString() || "N/A"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-4">
        <div className="col-span-2">
          <div className="text-sm font-bold text-gray-700 uppercase">
            Address
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {data.address || "N/A"}
          </span>
        </div>

        <div className="col-span-4">
          <div className="text-sm font-bold text-gray-700 uppercase">
            Description
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {data.description || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};