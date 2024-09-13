import { useState } from "react";
import Modal from "../../app/components/form/Modal";
import { FaEye, FaEdit } from "react-icons/fa";
import {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUserStatusChangeMutation,
  useDeleteUserByIdMutation,
} from "./booksApiSlice";
import { View } from "./View";
import { CreateForm } from "./CreateForm";
import CustomDataTable from "../../app/components/CustomDatatable";
import { EditForm } from "./EditForm";
import DataTableSkeleton from "../../app/components/skeletons/DatatableSkeleton";

const BooksList = () => {
  const { data: booksData, error, isLoading } = useGetUsersQuery();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const books = booksData?.items || [];

  const [statusChange] = useUserStatusChangeMutation();
  const [deleteQuery] = useDeleteUserByIdMutation();

  const { data: userById, isLoading: isUserLoading } = useGetUserByIdQuery(
    selectedUserId,
    {
      skip: !selectedUserId,
    }
  );

  const columns = [
    {
      name: "SN",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "65px",
    },
    {
      name: "Full Name",
      selector: (row) => `${row.firstName} ${row.lastName || "N/A"}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email || "N/A",
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age || "N/A",
      sortable: true,
      width: "70px",
    },
    {
      name: "Company",
      selector: (row) => row.company || "N/A",
      sortable: true,
    },
  ];

  const filterColumns = ["firstName", "lastName", "email", "company", "age"];

  return isLoading ? (
    <DataTableSkeleton />
  ): (
    
    <div className="max-w-6xl mx-auto p-2 mt-2">
      <Modal
        modalId="createUserModalId"
        buttonText="Create"
        headingText="Create User"
      >
        <CreateForm />
      </Modal>

     
      <CustomDataTable
        data={books}
        columns={columns}
        filterColumns={filterColumns}
        statusColumn={{
          active: true,
          id: (row) => row._uuid,
          onChange: statusChange,
        }}
        modals={[
          {
            modalId: "viewUser",
            title: "User Details",
            btnIcon: FaEye,
            className: "text-primary text-lg",
            setbtnIdFunc: (row) => setSelectedUserId(row._uuid),
            content: () => <View user={userById} isLoading={isUserLoading} />,
          },
          {
            btnIcon: FaEdit,
            title: "User Edit",
            className: "text-secondary text-lg",
            setbtnIdFunc: (row) => setSelectedUserId(row._uuid),
            content: () => (
              <EditForm user={userById} isLoading={isUserLoading} />
            ),
          },
        ]}
        deleteButton={{ id: (row) => row._uuid, deleteQuery }}
      />
    </div>
  );
};

export default BooksList;
