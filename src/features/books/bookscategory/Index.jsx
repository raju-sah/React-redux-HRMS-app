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
  const { data: getDatas, isLoading } = useGetBookCategoryQuery();
  const getData = getDatas?.items || [];
  const [selectedItemId, setselectedItemId] = useState(null);

  const [statusChange] = useBookCategoryStatusChangeMutation();
  const [deleteQuery] = useDeleteBookCategoryByIdMutation();

  const { data: dataById, isLoading: isFetching } = useGetBookCategoryByIdQuery(
    selectedItemId,
    {
      skip: !selectedItemId,
    }
  );

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

  const filterColumns = ["categoryName", "popularity"];

  return isLoading ? (
    <DataTableSkeleton />
  ) : (
    <div className="max-w-6xl mx-auto p-2 mt-2">
      <Modal
        modalId={`createModalId-${Date.now()}`}
        buttonText="Create"
        headingText="Create Book Category"
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
            title: "View Book Category",
            btnIcon: FaEye,
            className: "text-primary text-lg",
            setbtnIdFunc: (row) => setselectedItemId(row._uuid),
            content: () => <View data={dataById} isLoading={isFetching} />,
          },
          {
            modalId: `editModalId-${Date.now()}`,
            btnIcon: FaEdit,
            title: "Edit Book Category",
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
