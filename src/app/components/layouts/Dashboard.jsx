import { FaBook, FaFilm, FaTv, FaDragon } from "react-icons/fa";
import { DashboardCard } from "../dashboard/DasboardCard";
import { useGetBooksQuery } from "../../../features/books/booksApiSlice";
import Skeleton from "react-loading-skeleton";

const Dashboard = () => {
  const { data: booksData, isLoading }  =  useGetBooksQuery();
  

  return isLoading ? <div className="p-4 mt-10">
    {/* <h1 className="text-2xl font-bold mb-8">Dashboard</h1> */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <Skeleton className="mb-5" count={4} height={200} />
      <Skeleton className="mb-5" count={4} height={200} />
      <Skeleton className="mb-5" count={4} height={200} />
      <Skeleton className="mb-5" count={4} height={200} />
    </div>
  </div> : (
    
    <div className="p-2 mt-10">
      {/* <h1 className="text-2xl font-bold mb-8">Dashboard</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <DashboardCard name="Books" Icon={FaBook} link="/books" count={booksData?.items.length} />
        <DashboardCard name="Movies" Icon={FaFilm} link="/movies" count={24} />
        <DashboardCard name="Web Series" Icon={FaTv} link="/web-series" count={12} />
        <DashboardCard name="Animes" Icon={FaDragon} link="/animes" count={7} />
        <DashboardCard name="Animes" Icon={FaDragon} link="/animes" />
        <DashboardCard name="Animes" Icon={FaDragon} link="/animes" />
        <DashboardCard name="Animes" Icon={FaDragon} link="/animes" />
        <DashboardCard name="Animes" Icon={FaDragon} link="/animes" />
      </div>
    </div>
  );
};

export default Dashboard;
