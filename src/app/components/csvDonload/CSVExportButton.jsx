import { CSVLink } from "react-csv";
import { FaDownload } from "react-icons/fa";
export const CSVExportButton = ({ data }) => {
    const csvData = data.map((item) => ({
      ...item,
      status: item.status === 1 ? "Active" : "Inactive",
    }));

    return (
      <CSVLink
        data={csvData}
        filename="users_data.csv"
        className="bg-primary hover:bg-primary-dark border hover:transition-opacity text-white px-2 text-sm py-1 rounded-md flex items-center space-x-2"
        style={{ textDecoration: "none" }}
      >
        <FaDownload />
        <span>Export to CSV</span>
      </CSVLink>
    );
  };