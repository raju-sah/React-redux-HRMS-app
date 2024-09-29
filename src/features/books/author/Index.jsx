import { useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";

import Modal from "../../../app/components/form/Modal";
import DataTableSkeleton from "../../../app/components/skeletons/DatatableSkeleton";
import CustomDataTable from "../../../app/components/CustomDatatable";
import { Create } from "./Create";
import { Edit } from "./Edit";
import { View } from "./View";
import {
  useAuthorStatusChangeMutation,
  useDeleteAuthorByIdMutation,
  useGetAuthorByIdQuery,
  useGetAuthorQuery,
} from "./authorApiSlice";
import { countries } from "../../../enums/Country";
import PopularityBadge from "../../../app/components/PopularityBadge";

const Index = () => {
  const { data: getDatas, isLoading } = useGetAuthorQuery();
  const [selectedItemId, setselectedItemId] = useState(null);

  const getData = getDatas?.items || [];

  const [statusChange] = useAuthorStatusChangeMutation();
  const [deleteQuery] = useDeleteAuthorByIdMutation();

  const { data: dataById, isLoading: isFetching } = useGetAuthorByIdQuery(
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
      name: "Full Name",
      selector: (row) => row.firstName + " " + row.lastName || "N/A",
      sortable: true,
      width: "auto",
    },
    {
      name: "Nationality",
      selector: (row) => {
        const country = countries.find(
          (country) => country.value === row.nationality
        );
        return country ? country.label : "N/A";
      },
      sortable: true,
      width: "auto",
    },
    {
      name: "Date of Birth",
      selector: (row) =>
        new Date(row.dob).toLocaleDateString().split("/").join("-") || "N/A",
      sortable: true,
      width: "140px",
    },
    {
      name: "Popularity",
      selector: (row) =>
        <PopularityBadge popularity={row.popularity} /> || "N/A",
      sortable: true,
      width: "120px",
    },
  ];

  const filterColumns = ["firstName", "popularity"];

  return isLoading ? (
    <DataTableSkeleton />
  ) : (
    <div className="max-w-6xl mx-auto p-2 mt-2">
      <Modal
        modalId={`createModalId-${Date.now()}`}
        buttonText="Create"
        headingText="Create Author"
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
            title: "View Author",
            btnIcon: FaEye,
            className: "text-primary text-lg",
            setbtnIdFunc: (row) => setselectedItemId(row._uuid),
            content: () => <View data={dataById} isLoading={isFetching} />,
          },
          {
            modalId: `editModalId-${Date.now()}`,
            btnIcon: FaEdit,
            title: "Edit Author",
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
