import { FaEdit, FaEye } from "react-icons/fa";
import CustomDataTable from "../../../app/components/CustomDatatable";
import Modal from "../../../app/components/form/Modal";
import DataTableSkeleton from "../../../app/components/skeletons/DatatableSkeleton";
import { useMemo, useState } from "react";
import { Create } from "./Create";
import { View } from "./View";
import { Edit } from "./Edit";
import {
  useDeleteIndustryByIdMutation,
  useGetIndustryByIdQuery,
  useGetIndustrysQuery,
  useIndustryStatusChangeMutation,
} from "./IndustryApiSlice";
import { countries } from "../../../enums/Country";
import PopularityBadge from "../../../app/components/PopularityBadge";
import { languages } from "../../books/Language";
import { movieCities } from "../../../enums/MovieCity";

export const Index = () => {
  const { data: getDatas, isLoading } = useGetIndustrysQuery();
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [statusChange] = useIndustryStatusChangeMutation();
  const [deleteQuery] = useDeleteIndustryByIdMutation();

  const { data: dataById, isLoading: isFetching } = useGetIndustryByIdQuery(
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
      name: "Name",
      selector: (row) => row.name || "",
      sortable: true,
      width: "auto",
    },
    {
      name: "Origin Country",
      selector: (row) => countries.find(country => country.value === row.origin_country)?.label || "N/A",
      sortable: true,
      width: "auto",
    },
    {
      name: "Origin City",
      selector: (row) => (
        <div className="flex flex-wrap gap-1 py-1">
          {movieCities
            .filter((city) => row.origin_city.includes(city.value))
            .map((city) => (
              <span
                key={city.value}
                className="bg-purple-400 rounded-md px-2 py-1 mr-1 text-xs font-medium"
              >
                {city.label}
              </span>
            ))}
        </div>
      ),
      width: "200px",
    },
    {
      name: "Popularity",
      selector: (row) => <PopularityBadge popularity={row.popularity} /> || "",
      width: "auto",
    },
    {
      name: "Language",
      selector: (row) => languages.find(lang => lang.value === row.language)?.label || "N/A",
      sortable: true,
      width: "120px",
    },
  ];

  const getData = useMemo(() => {
    return (getDatas?.items || []).map((item) => ({
      ...item,
      originCountry: countries.find(country => country.value === item.origin_country)?.label || "N/A",
      originCity: movieCities
      .filter((city) => item.origin_city.includes(city.value))
      .map((city) => ( city.label)),
      languageName: languages.find(lang => lang.value === item.language)?.label || "N/A",
    }));
  }, [getDatas]);
  const filterColumns = ["name", "originCountry", "originCity", "languageName"];

  return isLoading ? (
    <DataTableSkeleton />
  ) : (
    <div className="max-w-6xl mx-auto p-2 mt-2">
      <Modal buttonText="Create" headingText="Create Industry">
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
            title: "View Industry",
            btnIcon: FaEye,
            className: "text-primary text-lg", // style for the icon
            setbtnIdFunc: (row) => setSelectedItemId(row._uuid),
            content: () => <View data={dataById} isLoading={isFetching} />,
          },
          {
            title: "Edit Industry",
            btnIcon: FaEdit,
            className: "text-secondary text-lg", // style for the icon
            setbtnIdFunc: (row) => setSelectedItemId(row._uuid),
            content: () => <Edit data={dataById} isLoading={isFetching} />,
          },
        ]}
        deleteButton={{ id: (row) => row._uuid, deleteQuery }}
      />
    </div>
  );
};
