import { useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";

import { Create } from "./Create";
import { Edit } from "./Edit";
import { View } from "./View";
import {
  useBookStatusChangeMutation,
  useDeleteBookByIdMutation,
  useGetBookByIdQuery,
  useGetBooksQuery,
} from "./booksApiSlice";
import Modal from "../../app/components/form/Modal";
import DataTableSkeleton from "../../app/components/skeletons/DatatableSkeleton";
import CustomDataTable from "../../app/components/CustomDatatable";
import { languages } from "./Language";
import { useGetAuthorQuery } from "./author/authorApiSlice";
import { useGetBookCategoryQuery } from "./bookscategory/booksCategoryApiSlice";

const Index = () => {
  const { data: getDatas, isLoading } = useGetBooksQuery();
  const getData = getDatas?.items || [];

  const { data: authorData, isLoading: isLoadingAuthor } = useGetAuthorQuery();
  const { data: booksCategoryData, isLoading: isLoadingBooksCategory } =
    useGetBookCategoryQuery();

  const [selectedItemId, setselectedItemId] = useState(null);

  const [statusChange] = useBookStatusChangeMutation();
  const [deleteQuery] = useDeleteBookByIdMutation();

  const { data: dataById, isLoading: isFetching } = useGetBookByIdQuery(
    selectedItemId,
    {
      skip: !selectedItemId,
    }
  );

  const columns = [
    {
      name: "SN",
      selector: (row, index) => index + 1,
      width: "55px",
    },
    {
      name: "Title",
      selector: (row) => row.name || "N/A",
      sortable: true,
      width: "200px",
    },
    {
      name: "Author",
      selector: (row) => (
        <div className="flex flex-wrap gap-1 py-1">
          {authorData?.items
            .filter((auth) => row.author.includes(auth?._uuid))
            .map((auth) => (
              <span
                key={auth?._uuid}
                className="bg-purple-400 rounded-md px-2 py-1 mr-1 text-xs font-medium"
              >
                {`${auth?.firstName} ${auth?.lastName}`}
              </span>
            ))}
        </div>
      ),
      width: "150px",
    },
    {
      name: "Category",
      selector: (row) => (
        <div className="flex flex-wrap gap-1 py-1">
          {booksCategoryData?.items
            .filter((cat) => row.category.includes(cat?._uuid))
            .map((cat) => (
              <span
                key={cat?._uuid}
                className="bg-purple-400 rounded-md px-2 py-1 mr-1 text-xs font-medium"
              >
                {cat?.categoryName}
              </span>
            ))}
        </div>
      ),
      width: "200px",
    },
    {
      name: "ISBN",
      selector: (row) => row.isbn || "N/A",
      sortable: true,
      width: "130px",
    },
    {
      name: "Language",
      selector: (row) =>
        languages.find((lang) => lang.value === row.language)?.label || "N/A",
      sortable: true,
      width: "120px",
    },
  ];

  const filterColumns = [
    "name",
    "publication",
    "isbn",
    "language",
    "edition",
    "price",
  ];

  return isLoading || isLoadingAuthor || isLoadingBooksCategory ? (
    <DataTableSkeleton />
  ) : (
    <div className="max-w-6xl mx-auto p-2 mt-2">
      <Modal
        modalId={`createModalId-${Date.now()}`}
        buttonText="Create"
        headingText="Create Book"
      >
        <Create />
      </Modal>

      <CustomDataTable
        data={getData}
        columns={columns}
        filterColumns={filterColumns}
        statusColumn={{
          id: (row) => row._uuid,
          onChange: statusChange,
        }}
        modals={[
          {
            modalId: `viewModalId-${Date.now()}`,
            title: "View Book",
            btnIcon: FaEye,
            className: "text-primary text-lg",
            setbtnIdFunc: (row) => {
              setselectedItemId(row._uuid);
            },
            content: () => <View data={dataById} isLoading={isFetching} />,
          },
          {
            modalId: `editModalId-${Date.now()}`,
            title: "Edit Book",
            btnIcon: FaEdit,
            className: "text-secondary text-lg",
            setbtnIdFunc: (row) => setselectedItemId(row._uuid),
            content: () => <Edit data={dataById} isLoading={isFetching} />,
          },
        ]}
        deleteButton={{ id: (row) => row._uuid, deleteQuery }}
      />
    </div>
  );
};

export default Index;
