import { Link, useLocation } from "react-router-dom";

export const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb" className="text-gray-500 space-x-1">
      <ul className="flex items-center">
      {pathnames.length > 0 && (
          <li>
            <Link to="/" className="hover:underline hover:text-gray-700 text-lg">
              Home
            </Link>
          </li>
        )}

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={name} className="flex items-center">
              <span className="mx-2 text-gray-500 text-lg">{">"}</span>
              {isLast ? (
                <span className="text-gray-700 text-lg font-semibold capitalize">{name}</span> // No link for last breadcrumb
              ) : (
                <Link
                  to={routeTo}
                  className="hover:underline hover:text-gray-700 capitalize"
                >
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
