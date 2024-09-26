import "react-loading-skeleton/dist/skeleton.css";
import ViewSkeleton from "../../../app/components/skeletons/ViewSkeleton";
import { countries } from "../../../enums/Country";
import PopularityBadge from "../../../app/components/PopularityBadge";
import { movieCities } from "../../../enums/MovieCity";
import { languages } from "../../books/Language";

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
          <div className="text-sm font-bold text-gray-700 uppercase">Name</div>
          <span className="text-sm text-gray-600 ml-2">{data.name}</span>
        </div>
        <div className="col-span-1">
          <div className="text-sm font-bold text-gray-700 uppercase mb-2">
            Origin Country
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {countries.find((country) => country.value === data.origin_country)
              ?.label || "N/A"}
          </span>
        </div>
        <div className="col-span-1">
          <div className="text-sm font-bold text-gray-700 uppercase">
            Origin City
          </div>
          <div className="flex flex-wrap gap-1 py-1">
            {movieCities
              .filter((city) => data.origin_city.includes(city.value))
              .map((city) => (
                <span
                  key={city.value}
                  className="bg-purple-400 rounded-md px-2 py-1 mr-1 text-xs font-medium"
                >
                  {city.label}
                </span>
              ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="col-span-1">
          <div className="text-sm font-bold text-gray-700 uppercase">
            Language
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {languages.find((lang) => lang.value === data.language)?.label ||
              "N/A"}
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
