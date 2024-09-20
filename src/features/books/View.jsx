import "react-loading-skeleton/dist/skeleton.css";
import { languages } from "./Language";
import ViewSkeleton from "../../app/components/skeletons/ViewSkeleton";
import { useGetBookCategoryByIdQuery } from "./bookscategory/booksCategoryApiSlice";
import { useGetAuthorByIdQuery } from "./author/authorApiSlice";

export const View = ({ data, isLoading }) => {
  const { data: author, isLoading: isLoadingAuthor } = useGetAuthorByIdQuery(
    data?.author,
    { skip: !data?.author }
  );
  const { data: category, isLoading: isLoadingCategory } =
    useGetBookCategoryByIdQuery(data?.category, { skip: !data?.category });

  if (isLoading || !data || isLoadingAuthor || isLoadingCategory)
    return <ViewSkeleton />;

  return (
    <div className="p-4">
      <div className="flex items-center mb-4 border-b-2 p-2 border-[#d8dbdd]">
        <span
          className={`ml-auto inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
            data.status === 1
              ? "bg-green-200 text-green-700 ring-green-600/20"
              : "bg-red-200 text-red-700 ring-red-600/20"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <div className="text-sm font-bold text-gray-700 uppercase">Title</div>
          <span className="text-sm text-gray-600">{data.title}</span>
        </div>
        <div className="col-span-1">
          <div className="text-sm font-bold text-gray-700 uppercase">
            Author
          </div>
          <span className="text-sm text-gray-600">
            {author ? `${author.firstName} ${author.lastName}` : "N/A"}
          </span>
        </div>
        <div className="col-span-1">
          <div className="text-sm font-bold text-gray-700 uppercase">
            Category
          </div>
          <span className="text-sm text-gray-600">
            {category ? category.categoryName : "N/A"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        <div className="col-span-1">
          <div className="text-sm font-bold text-gray-700 uppercase">
            Publication
          </div>
          <span className="text-sm text-gray-600">{data.publication}</span>
        </div>
        <div className="col-span-1">
          <div className="text-sm font-bold text-gray-700 uppercase">ISBN</div>
          <span className="text-sm text-gray-600">{data.isbn}</span>
        </div>
        <div className="col-span-1">
          <div className="text-sm font-bold text-gray-700 uppercase">
            Edition
          </div>
          <span className="text-sm text-gray-600">{data.edition}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        <div className="col-span-1">
          <div className="text-sm font-bold text-gray-700 uppercase">
            Language
          </div>
          <span className="text-sm text-gray-600">
            {languages.find((lang) => lang.value === data.language)?.label ||
              "N/A"}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-sm font-bold text-gray-700 uppercase">
          Description
        </div>
        <span className="text-sm text-gray-600">
          {data.description || "N/A"}
        </span>
      </div>
    </div>
  );
};
