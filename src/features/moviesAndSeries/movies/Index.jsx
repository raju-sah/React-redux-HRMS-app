import { useMemo, useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import { Create } from "./Create";
import { Edit } from "./Edit";
import { View } from "./View";
import {
  useDeleteMovieByIdMutation,
  useGetMovieByIdQuery,
  useGetMoviesQuery,
  useMovieStatusChangeMutation,
} from "./MovieApiSlice";
import { useGetGenresQuery } from "../genres/GenreApiSlice";
import { useGetIndustrysQuery } from "../industry/IndustryApiSlice";
import DataTableSkeleton from "../../../app/components/skeletons/DatatableSkeleton";
import Modal from "../../../app/components/form/Modal";
import CustomDataTable from "../../../app/components/CustomDatatable";
import { movieRating } from "../../../enums/MovieRating";

export const Index = () => {
  const { data: getDatas, isLoading } = useGetMoviesQuery();
  const [statusChange] = useMovieStatusChangeMutation();
  const [deleteQuery] = useDeleteMovieByIdMutation();

  const [selectedItemId, setselectedItemId] = useState(null);
  const { data: dataById, isLoading: isFetching } = useGetMovieByIdQuery(
    selectedItemId,
    {
      skip: !selectedItemId,
    }
  );
  const { data: GenreData } = useGetGenresQuery();
  const { data: industryData } = useGetIndustrysQuery();

  const columns = [
    {
      name: "SN",
      selector: (row, index) => index + 1,
      width: "55px",
    },
    {
      name: "Name",
      selector: (row) => row.name || "N/A",
      sortable: true,
      width: "200px",
      cell: (row) => row.name || "N/A",
    },
    {
      name: "Industry",
      selector: (row) => (
        <div className="flex flex-wrap gap-1 py-1">
          {industryData?.items
            .filter((cat) => row.industry.includes(cat?._uuid))
            .map((cat) => (
              <span
                key={cat?._uuid}
                className="bg-purple-400 rounded-md px-2 py-1 mr-1 text-xs font-medium"
              >
                {cat?.name}
              </span>
            ))}
        </div>
      ),
      width: "200px",
    },
    {
      name: "Directors",
      selector: (row) => (
        <div className="flex flex-wrap gap-1 py-1">
          {row.directors.map((director, index) => (
            <span
              key={index}
              className="bg-purple-400 rounded-md px-2 py-1 mr-1 text-xs font-medium"
            >
              {director}
            </span>
          ))}
        </div>
      ),
      width: "150px",
    },
    {
      name: "Actors",
      selector: (row) => (
        <div className="flex flex-wrap gap-1 py-1">
          {row.actors.map((actor, index) => (
            <span
              key={index}
              className="bg-purple-400 rounded-md px-2 py-1 mr-1 text-xs font-medium"
            >
              {actor}
            </span>
          ))}
        </div>
      ),
      width: "150px",
    },
    {
      name: "Genre",
      selector: (row) => (
        <div className="flex flex-wrap gap-1 py-1">
          {GenreData?.items
            .filter((auth) => row.genre.includes(auth?._uuid))
            .map((auth) => (
              <span
                key={auth?._uuid}
                className="bg-purple-400 rounded-md px-2 py-1 mr-1 text-xs font-medium"
              >
                {auth.name}
              </span>
            ))}
        </div>
      ),
      width: "170px",
    },
    {
      name: "Run Time",
      selector: (row) => {
        const hours = row.run_time_hour || 0;
        const minutes = row.run_time_minute || 0;
        return `${hours}h ${minutes}m`;
      },
      sortable: true,
      width: "130px",
    },
    {
      name: "Rating",
      selector: (row) =>
        movieRating.find((rating) => rating.value === row.rating)?.label ||
        "N/A",
      sortable: true,
      width: "120px",
    },
  ];

  const getData = useMemo(() => {
    return (getDatas?.items || []).map((item) => ({
      ...item,
      genreNames: GenreData?.items
        .filter((auth) => item.genre.includes(auth?._uuid))
        .map((auth) => auth?.name)
        .join(", "),
      industryNames: industryData?.items
        .filter((cat) => item.industry.includes(cat?._uuid))
        .map((cat) => cat?.name),
    }));
  }, [getDatas, GenreData, industryData]);

  const filterColumns = ["name", "genreNames", "industryNames"];

  return isLoading ? (
    <DataTableSkeleton />
  ) : (
    <div className="max-w-6xl mx-auto p-2 mt-2">
      <Modal buttonText="Create" headingText="Create Book">
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
            title: "View Book",
            btnIcon: FaEye,
            className: "text-primary text-lg", // style for the icon
            setbtnIdFunc: (row) => {
              setselectedItemId(row._uuid);
            },
            content: () => <View data={dataById} isLoading={isFetching} />,
          },
          {
            title: "Edit Book",
            btnIcon: FaEdit,
            className: "text-secondary text-lg",
            setbtnIdFunc: (row) => setselectedItemId(row._uuid),
            content: () => <Edit data={dataById} isLoading={isFetching} />,
          },
        ]}
        deleteButton={{ id: (row) => row._uuid, deleteQuery }}
      />
    </div>
  );
};
