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
  const { data: booksData, isLoading } = useGetBooksQuery();
  const books = booksData?.items || [];

  const { data: authorData } = useGetAuthorQuery();
  const { data: booksCategoryData } = useGetBookCategoryQuery();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [statusChange] = useBookStatusChangeMutation();
  const [deleteQuery] = useDeleteBookByIdMutation();

  const { data: userById, isLoading: isUserLoading } = useGetBookByIdQuery(
    selectedUserId,
    {
      skip: !selectedUserId,
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
      selector: (row) => row.title || "N/A",
      sortable: true,
      width: "200px",
    },
    {
      name: "Author",
      selector: (row) =>
        authorData?.items.map((author) =>
          author?._uuid === row.author
            ? author?.firstName + " " + author?.lastName
            : null
        ) || "N/A",
      sortable: true,
      width: "200px",
    },
    {
      name: "Category",
      selector: (row) =>
        booksCategoryData?.items.map((category) =>
          category?._uuid === row.category ? category?.categoryName : null
        ) || "N/A",
      sortable: true,
      width: "130px",
    },
    {
      name: "ISBN",
      selector: (row) => row.isbn || "N/A",
      sortable: true,
      width: "130px",
    },
    {
      name: "Language",
      selector: (row) => languages.find((lang) => lang.value === row.language)?.label || "N/A",
      sortable: true,
      width: "120px",
    },
    {
      name: "Edition",
      selector: (row) => row.edition || "N/A",
      sortable: true,
      width: "130px",
    },
  ];

  const filterColumns = [
    "title",
    "author",
    "category",
    "publication",
    "isbn",
    "language",
    "edition",
  ];

  return isLoading ? (
    <DataTableSkeleton />
  ) : (
    <div className="max-w-6xl mx-auto p-2 mt-2">
      <Modal
        modalId="createBookModalId"
        buttonText="Create"
        headingText="Create Book"
      >
        <Create />
      </Modal>

      <CustomDataTable
        data={books}
        columns={columns}
        filterColumns={filterColumns}
        statusColumn={{
          id: (row) => row._uuid,
          onChange: statusChange,
        }}
        modals={[
          {
            modalId: "viewBookModalId",
            title: "Book Details",
            btnIcon: FaEye,
            className: "text-primary text-lg",
            setbtnIdFunc: (row) => setSelectedUserId(row._uuid),
            content: () => <View data={userById} isLoading={isUserLoading} />,
          },
          {
            modalId: "editBookModalId",
            title: "Book Edit",
            btnIcon: FaEdit,
            className: "text-secondary text-lg",
            setbtnIdFunc: (row) => setSelectedUserId(row._uuid),
            content: () => <Edit data={userById} isLoading={isUserLoading} />,
          },
        ]}
        deleteButton={{ id: (row) => row._uuid, deleteQuery }}
      />
    </div>
  );
};

export default Index;
