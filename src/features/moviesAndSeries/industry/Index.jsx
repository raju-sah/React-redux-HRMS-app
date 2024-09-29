import { FaEdit, FaEye } from "react-icons/fa";
import CustomDataTable from "../../../app/components/CustomDatatable";
import Modal from "../../../app/components/form/Modal";
import DataTableSkeleton from "../../../app/components/skeletons/DatatableSkeleton";
import { useState } from "react";
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
  const getData = getDatas?.items || [];
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
      selector: (row) => {
        const country = countries.find(
          (country) => country.value === row.origin_country
        );
        return country ? country.label : "N/A";
      },
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
      selector: (row) =>
        languages.find((lang) => lang.value === row.language)?.label || "N/A",
      sortable: true,
      width: "120px",
    },
  ];

  const filterColumns = ["name", "ageGroup"];

  return isLoading ? (
    <DataTableSkeleton />
  ) : (
    <div className="max-w-6xl mx-auto p-2 mt-2">
      <Modal
        modalId={`createModalId-${Date.now()}`}
        buttonText="Create"
        headingText="Create Industry"
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
            title: "View Industry",
            btnIcon: FaEye,
            className: "text-primary text-lg",
            setbtnIdFunc: (row) => setSelectedItemId(row._uuid),
            content: () => <View data={dataById} isLoading={isFetching} />,
          },
          {
            modalId: `editModalId-${Date.now()}`,
            title: "Edit Industry",
            btnIcon: FaEdit,
            className: "text-secondary text-lg",
            setbtnIdFunc: (row) => setSelectedItemId(row._uuid),
            content: () => <Edit data={dataById} isLoading={isFetching} />,
          },
        ]}
        deleteButton={{ id: (row) => row._uuid, deleteQuery }}
      />
    </div>
  );
};
