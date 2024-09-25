import { FaEdit, FaEye } from "react-icons/fa";
import CustomDataTable from "../../../app/components/CustomDatatable";
import Modal from "../../../app/components/form/Modal";
import DataTableSkeleton from "../../../app/components/skeletons/DatatableSkeleton";
import { useState } from "react";
import {
  useDeleteGenreByIdMutation,
  useGenreStatusChangeMutation,
  useGetGenreByIdQuery,
  useGetGenresQuery,
} from "./GenreApiSlice";
import { Create } from "./Create";
import { View } from "./View";
import { Edit } from "./Edit";
import { ageGroupOptions } from "../../books/bookscategory/AgeGroup";

export const Index = () => {
  const { data: booksCategoryData, isLoading } = useGetGenresQuery();
  const booksCategory = booksCategoryData?.items || [];
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [statusChange] = useGenreStatusChangeMutation();
  const [deleteQuery] = useDeleteGenreByIdMutation();

  const { data: userById, isLoading: isUserLoading } = useGetGenreByIdQuery(
    selectedUserId,
    {
      skip: !selectedUserId,
    }
  );

  const columns = [
    {
      name: "SN",
      selector: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Name",
      selector: (row) => row.name || "",
      sortable: true,
      width: "auto",
    },
    {
      name: "Age Group",
      selector: (row) => (
        <div className="flex flex-wrap gap-1 py-2">
          {row.ageGroup?.map((groupIndex) => (
            <span
              key={groupIndex}
              className="bg-purple-400 rounded-md px-2 py-1 mr-1 text-xs font-medium"
            >
              {ageGroupOptions[groupIndex]?.label}
            </span>
          ))}
        </div>
      ),
      width: "auto",
    },
  ];

  const filterColumns = ["name", "ageGroup"];

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
