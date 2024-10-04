import { useState, useMemo, isValidElement } from "react";
import DataTable from "react-data-table-component";
import ToggleButton from "../../app/components/form/ToggleButton";
import ExportCSV from "./csvDonload/ExportCSV";
import Modal from "./form/Modal";
import { Delete } from "./crud/Delete";
import PropTypes from "prop-types";


const CustomDataTable = ({
  data,
  columns,
  filterColumns,
  statusColumn={},
  modals = [],
  deleteButton,
}) => {
  const [filterText, setFilterText] = useState("");

  const filteredItems = useMemo(() => {
    return data.filter((item) => {
      return filterColumns.some((column) =>
        item[column]
          ?.toString()
          .toLowerCase()
          .includes(filterText.toLowerCase())
      );
    });
  }, [data, filterColumns, filterText]);

  const subHeaderComponent = useMemo(
    () => (
      <input
        type="text"
        placeholder="Search..."
        className="w-1/4 py-1 px-2 border border-gray-500 rounded focus:border-primary focus:outline-none"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
    ),
    [filterText]
  );

  const customStyles = {
    rows: {
      style: {
        minHeight: "45px", // overridding the default row height
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "#021526",
      },
    },
  };
  const statusColumnConfig = useMemo(
    () => ({
      name: "Status",
      cell: (row) => (
        <ToggleButton
          userId={statusColumn.id(row)}
          isToggled={row.status}
          StatusChange={statusColumn.onChange}
        />
      ),
      width: "75px",
    }),
    [statusColumn]
  );

  const actionColumn = useMemo(
    () => ({
      name: "Actions",
      width: "auto",

      cell: (row) => (
        <div className="flex space-x-2">
          {modals.map((modal, index) => (
            <Modal
              key={row._uuid + index}
              icon={modal.btnIcon}
              headingText={modal.title}
              className={modal.className}
              setbtnIdFunc={() => modal.setbtnIdFunc(row)}
            >
              {typeof modal.content === "function"
                ? modal.content(row)
                : isValidElement(modal.content)
                ? modal.content
                : null}
            </Modal>
          ))}
          {deleteButton && (
            <Delete
              itemId={deleteButton.id(row)}
              deleteFn={deleteButton.deleteQuery}
            />
          )}
        </div>
      ),
    }),
    [modals, deleteButton]
  );

  return (
    <>
      <ExportCSV
        data={filteredItems}
        className="rounded border hover:bg-transparent relative left-20 bottom-[30px] hover:border-primary hover:text-primary cursor-pointer"
      />
      <DataTable
        columns={[
          ...columns,
          statusColumn && statusColumnConfig,
          actionColumn,
        ].filter(Boolean)}
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
        fixedHeader
        fixedHeaderScrollHeight="541px"
        // selectableRows // uncomment this line if you want to enable row selection
        // dense
        customStyles={customStyles}
      />
    </>
  );
};

CustomDataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  filterColumns: PropTypes.array.isRequired,
  statusColumn: PropTypes.object,
  modals: PropTypes.array,
  deleteButton: PropTypes.object,
};

export default CustomDataTable;
