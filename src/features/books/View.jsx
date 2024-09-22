import "react-loading-skeleton/dist/skeleton.css";
import { languages } from "./Language";
import ViewSkeleton from "../../app/components/skeletons/ViewSkeleton";
import { useGetBookCategoryQuery } from "./bookscategory/booksCategoryApiSlice";
import { useGetAuthorQuery } from "./author/authorApiSlice";

export const View = ({ data, isLoading }) => {
  const { data: authorData, isLoading: isLoadingAuthor } = useGetAuthorQuery();
  const { data: categoryData, isLoading: isLoadingCategory } =
    useGetBookCategoryQuery();

  if (isLoading || !data || isLoadingAuthor || isLoadingCategory)
    return <ViewSkeleton />;

  return (
    <div className="p-4">
      <div className="flex items-center mb-4 border-b-2 p-2 border-[#d8dbdd]">
        <span
          className={`ml-auto inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
            data.status === true
              ? "bg-green-200 text-green-700 ring-green-600/20"
              : "bg-red-200 text-red-700 ring-red-600/20"
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

      <div className="flex">
        <div className="flex-1">
          <img
            src={
              data.image_url ||
              "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
            }
            alt={data.name}
            className="w-[250px] h-[250px] rounded-md object-fill"
          />
        </div>
        <div className="flex-1">
          <div>
            <div className="text-sm font-bold text-gray-700 uppercase">
              Title
            </div>
            <span className="text-sm text-gray-600">{data.name}</span>
          </div>

          <div className="mt-5">
            <div className="text-sm font-bold text-gray-700 uppercase">
              Authors
            </div>
            <div className="flex flex-wrap gap-2">
              {authorData?.items
                .filter((auth) => data.author.includes(auth?._uuid))
                .map((auth) => (
                  <span
                    key={auth?._uuid}
                    className="bg-purple-400 rounded-md px-2 py-1 text-xs font-medium"
                  >
                    {`${auth?.firstName} ${auth?.lastName}`}
                  </span>
                ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-sm font-bold text-gray-700 uppercase">
              Language
            </div>
            <span className="text-sm text-gray-600">
              {languages.find((lang) => lang.value === data.language)?.label ||
                "N/A"}
            </span>
          </div>
          <div className="mt-5">
            <div className="text-sm font-bold text-gray-700 uppercase">
              ISBN
            </div>
            <span className="text-sm text-gray-600">{data.isbn}</span>
          </div>
        </div>

        <div className="flex-1">
          <div>
            <div className="text-sm font-bold text-gray-700 uppercase">
              Category
            </div>
            <div className="flex flex-wrap gap-2">
              {categoryData?.items
                .filter((cat) => data.category.includes(cat?._uuid))
                .map((cat) => (
                  <span
                    key={cat?._uuid}
                    className="bg-purple-400 rounded-md px-2 py-1 text-xs font-medium"
                  >
                    {cat?.categoryName}
                  </span>
                ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-sm font-bold text-gray-700 uppercase">
              Price
            </div>
            <span className="text-sm text-gray-600">Rs.{data.price || "N/A"}</span>
          </div>

          <div className="mt-5">
            <div className="text-sm font-bold text-gray-700 uppercase">
              Edition
            </div>
            <span className="text-sm text-gray-600">{data.edition}</span>
          </div>

          <div className="mt-5">
            <div className="text-sm font-bold text-gray-700 uppercase">
              Publication
            </div>
            <span className="text-sm text-gray-600">{data.publication}</span>
          </div>
        </div>
      </div>

      <div className="mt-5">
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
