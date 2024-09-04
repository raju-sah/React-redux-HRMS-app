import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import ToggleButton from "../../app/components/form/ToggleButton";
import { CSVExportButton } from "./csvDonload/CSVExportButton";
import ExportCSV from "./csvDonload/ExportCSV";

const CustomDataTable = ({
  data,
  columns,
  filterColumns,
  actionsSlot,
  statusColumn, // New prop for status column configuration
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

  // Create the status column configuration
  const statusColumnConfig = {
    name: "Status",
    cell: (row) => (
      <ToggleButton
        userId={statusColumn.id(row)}
        isToggled={row.status === 1}
        StatusChange={statusColumn.onChange}
      />
    ),
    width: "80px",
  };

  // Create the action column configuration
  const actionColumn = {
    name: "Actions",
    cell: (row) => (
      <div className="flex space-x-2">
        {actionsSlot(row)} {/* Render the custom actions slot */}
      </div>
    ),
  };

  return (
    <>
      <ExportCSV
        data={filteredItems}
        className={
          "rounded border hover:bg-transparent relative left-20 bottom-[30px] hover:border-primary hover:text-primary cursor-pointer"
        }
      />
      <DataTable
        columns={[
          ...columns,
          statusColumn.active && statusColumnConfig,
          actionColumn,
        ].filter(Boolean)} // Include status column before action column
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
        subHeaderComponent={
          <>
            {subHeaderComponent}
            {/* <CSVExportButton data={data} /> */}
          </>
        }
        persistTableHead
        fixedHeader
        fixedHeaderScrollHeight="400px"
      />
    </>
  );
};

export default CustomDataTable;
