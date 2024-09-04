import { useState } from "react";
import Modal from "../../app/components/form/Modal";
import { FaEye, FaEdit } from "react-icons/fa";
import { Delete } from "../../app/components/crud/Delete";
import {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUserStatusChangeMutation,
  useDeleteUserByIdMutation,
} from "./usersApiSlice";
import { View } from "./View";
import { CreateForm } from "./CreateForm";
import CustomDataTable from "../../app/components/CustomDatatable";

const UsersList = () => {
  const { data: usersData, error, isLoading } = useGetUsersQuery();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const users = usersData?.items || [];

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
  const actions = ["view", "edit", "delete"];

  return (
    <div className="max-w-6xl mx-auto p-2 mt-2">
    <Modal buttonText="Create" headingText="Create User">
      <CreateForm />
    </Modal>
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p>Error loading users: {error.message}</p>}
      <CustomDataTable
        data={users}
        columns={columns}
        filterColumns={filterColumns}
        statusColumn={{ active: true, id: (row) => row._uuid, onChange: statusChange}}
        actionsSlot={(row) => (
          <>
            <Modal
              icon={FaEye}
              headingText="User Details"
              className="text-primary text-lg"
              btnClick={() => setSelectedUserId(row._uuid)}
            >
              <View user={userById} isLoading={isUserLoading} />
            </Modal>

            <Modal
              icon={FaEdit}
              headingText="User Edit"
              className="text-secondary text-lg"
            >
              <CreateForm />
            </Modal>

            <Delete itemId={row._uuid} deleteFn={deleteQuery} />
          </>
        )}
       
      />
    </div>
  );
};

export default UsersList;