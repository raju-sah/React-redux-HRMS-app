import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const DashboardCard = ({ name, Icon, link = "/", count = 0 }) => {
  return (
    <Link
      to={link}
      className="block bg-gradient-to-r from-[#00223E] to-[#135058] shadow-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300"
    >
      <div className="flex items-center justify-center mb-4">
        <Icon className="text-5xl text-[#858280] transform hover:scale-110 transition-transform duration-300 hover:text-[#D38312]" />
      </div>
      <h2 className="text-center text-4xl font-semibold text-[#858280] hover:text-[#D38312]">
        {count}
      </h2>
      <h2 className="text-center text-xl font-semibold text-[#858280] hover:text-[#D38312]">
        {name}
      </h2>
      {}
    </Link>
  );
};

DashboardCard.propTypes = {
  name: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  link: PropTypes.string,
  count: PropTypes.number,
};
