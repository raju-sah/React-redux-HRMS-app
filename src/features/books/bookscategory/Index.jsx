import { useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import Modal from "../../../app/components/form/Modal";
import DataTableSkeleton from "../../../app/components/skeletons/DatatableSkeleton";
import CustomDataTable from "../../../app/components/CustomDatatable";
import { Create } from "./Create";
import { Edit } from "./Edit";
import { View } from "./View";
import { ageGroupOptions } from "./AgeGroup";
import {
  useBookCategoryStatusChangeMutation,
  useDeleteBookCategoryByIdMutation,
  useGetBookCategoryByIdQuery,
  useGetBookCategoryQuery,
} from "./booksCategoryApiSlice";
import PopularityBadge from "../../../app/components/PopularityBadge";

const Index = () => {
  const { data: booksCategoryData, isLoading } = useGetBookCategoryQuery();
  const booksCategory = booksCategoryData?.items || [];
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [statusChange] = useBookCategoryStatusChangeMutation();
  const [deleteQuery] = useDeleteBookCategoryByIdMutation();

  const { data: userById, isLoading: isUserLoading } =
    useGetBookCategoryByIdQuery(selectedUserId, {
      skip: !selectedUserId,
    });

  const columns = [
    {
      name: "SN",
      selector: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Category Name",
      selector: (row) => row.categoryName || "",
      sortable: true,
      width: "auto",
    },
    {
      name: "Popularity",
      selector: (row) => <PopularityBadge popularity={row.popularity} /> || "",
      sortable: true,
      width: "auto",
    },
    {
      name: "Age Group",
      selector: (row) =>
        Array.isArray(row.ageGroup) && row.ageGroup.length > 0 ? (
          <div className="flex flex-wrap">
            {row.ageGroup.map((ageGroup, index) => (
              <span
                key={index}
                className="bg-purple-400 py-1 px-1 rounded-md mt-1 mb-1 mr-1"
              >
                {ageGroupOptions[ageGroup] || ""}
              </span>
            ))}
          </div>
        ) : (
          ""
        ),
      width: "auto",
    },
  ];

  const filterColumns = [
    "categoryName",
    "popularity",
    "relatedGenres",
    "ageGroup",
  ];

  return isLoading ? (
    <DataTableSkeleton />
  ) : (
    <div className="max-w-6xl mx-auto p-2 mt-2">
      <Modal
        modalId="createUserModalId"
        buttonText="Create"
        headingText="Create Book Category"
      >
        <Create />
      </Modal>

      <CustomDataTable
        data={booksCategory}
        columns={columns}
        filterColumns={filterColumns}
        statusColumn={{
          id: (row) => row._uuid,
          onChange: statusChange,
        }}
        modals={[
          {
            modalId: "viewUser",
            title: "Book Category Details",
            btnIcon: FaEye,
            className: "text-primary text-lg",
            setbtnIdFunc: (row) => setSelectedUserId(row._uuid),
            content: () => <View data={userById} isLoading={isUserLoading} />,
          },
          {
            btnIcon: FaEdit,
            title: "Book Category Edit",
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
