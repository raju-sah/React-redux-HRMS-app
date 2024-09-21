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
  const { data: authorData, error, isLoading } = useGetAuthorQuery();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const auhtor = authorData?.items || [];

  const [statusChange] = useAuthorStatusChangeMutation();
  const [deleteQuery] = useDeleteAuthorByIdMutation();

  const { data: userById, isLoading: isUserLoading } = useGetAuthorByIdQuery(
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
      name: "Full Name",
      selector: (row) => row.firstName + " " + row.lastName || "N/A",
      sortable: true,
      width: "auto",
    },
    {
      name: "Nationality",
      selector: (row) => {
        const country = countries.find(
          (country) => country.code === row.nationality
        );
        return country ? country.name : "N/A";
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
        modalId="createAuthorId"
        buttonText="Create"
        headingText="Create Author"
      >
        <Create />
      </Modal>

      <CustomDataTable
        data={auhtor}
        columns={columns}
        filterColumns={filterColumns}
        statusColumn={{
          id: (row) => row._uuid,
          onChange: statusChange,
        }}
        modals={[
          {
            modalId: "viewAuthorId",
            title: "Author Details",
            btnIcon: FaEye,
            className: "text-primary text-lg",
            setbtnIdFunc: (row) => setSelectedUserId(row._uuid),
            content: () => <View data={userById} isLoading={isUserLoading} />,
          },
          {
            modalId: "editAuthorId",
            btnIcon: FaEdit,
            title: "Author Edit",
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
