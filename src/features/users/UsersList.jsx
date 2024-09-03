import { useState, useMemo } from "react";
import { CreateForm } from "./CreateForm";
import Modal from "../../app/components/form/Modal";
import DataTable from "react-data-table-component";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../app/components/crud/Delete";
import {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUserStatusChangeMutation,
} from "./usersApiSlice";
import View from "./View";
import ToggleButton from "../../app/components/form/ToggleButton";
import { toast } from "react-toastify";

const UsersList = () => {
  const { data: usersData, error, isLoading } = useGetUsersQuery();
  const [filterText, setFilterText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const users = usersData?.items || [];

  const [userStatusChange] = useUserStatusChangeMutation();

  const { data: userById, isLoading: isUserLoading } = useGetUserByIdQuery(
    selectedUserId,
    {
      skip: !selectedUserId,
    }
  );

  const handleStatusToggle = async (user, newStatus) => {
    try {
      await userStatusChange({ id: user._uuid, status: newStatus }).unwrap();
      toast.success("User status changed successfully!");
    } catch (err) {
      toast.error(
        "Failed to change status of user: " +
          (err.data?.message || "Unknown error")
      );
    }
  };

  const handleViewUser = (userId) => {
    setSelectedUserId(userId);
  };

  const columns = [
    {
      name: "SN",
      selector: (row, index) => index + 1,
      sortable: true,
      width : "65px"
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
      width : "70px"
    },
    {
      name: "Company",
      selector: (row) => row.company || "N/A",
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <ToggleButton
          isToggled={row.status === 1}
          onToggle={(newStatus) => handleStatusToggle(row, newStatus ? 1 : 0)}
        />
      ),
      width : "80px"
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <Modal
            icon={FaEye}
            headingText="User Details"
            className="text-primary text-lg"
            btnClick={() => handleViewUser(row._uuid)}
          >
            {selectedUserId === row._uuid && userById && (
              <View user={userById} isLoading={isUserLoading} />
            )}
          </Modal>

          <Modal
            icon={FaEdit}
            headingText="User Edit"
            className="text-secondary text-lg"
          >
            <CreateForm />
          </Modal>

          <Delete user={row} />
        </div>
      ),
    },
  ];

  const filteredItems = useMemo(() => {
    return users.filter((item) => {
      return (
        item.firstName?.toLowerCase().includes(filterText.toLowerCase()) ||
        item.lastName?.toLowerCase().includes(filterText.toLowerCase()) ||
        item.company?.toLowerCase().includes(filterText.toLowerCase()) ||
        item.email?.toLowerCase().includes(filterText.toLowerCase()) ||
        item.age?.toString().includes(filterText.toLowerCase())
      );
    });
  }, [users, filterText]);

  const subHeaderComponent = useMemo(() => {
    return (
      <input
        type="text"
        placeholder="Search..."
        className="w-1/4 py-1 px-2 border border-gray-500 rounded focus:border-primary focus:outline-none"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
    );
  }, [filterText]);

  if (isLoading) {
    return <div className="text-center mt-4 text-blue-500">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-center mt-4 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-2 mt-2">
      <Modal buttonText="Create User" headingText="Create User">
        <CreateForm />
      </Modal>

      <DataTable
        // title="Users List"
        columns={columns}
        data={filteredItems}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
        paginationComponentOptions={{
          rowsPerPageText: "Rows per page:",
          rangeSeparatorText: "of",
          noRowsPerPage: false,
          selectAllRowsItem: true,
          selectAllRowsItemText: "All",
        }}
        subHeader
        subHeaderComponent={subHeaderComponent}
        persistTableHead
      />
    </div>
  );
};

export default UsersList;
