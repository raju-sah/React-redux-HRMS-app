const convertArrayOfObjectsToCSV = (array) => {
  let result;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
};

const downloadCSV = (array) => {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
};

const ExportCSV = ({ data, className }) => {
  return (
    <button
      className={`bg-primary hover:bg-primary-dark ${className}  text-white px-2 py-1 text-sm relative rounded`}
      onClick={() => downloadCSV(data)}
    >
      Export
    </button>
  );
};

export default ExportCSV;