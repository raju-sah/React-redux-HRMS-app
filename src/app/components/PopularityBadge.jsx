import PropTypes from "prop-types";

const PopularityBadge = ({ popularity }) => {
  const popularityClass =
    popularity >= 80
      ? "bg-green-400"
      : popularity >= 60
      ? "bg-yellow-400"
      : popularity >= 40
      ? "bg-orange-400"
      : "bg-red-400";

  const popularityLabel =
    popularity >= 80
      ? "High"
      : popularity >= 60
      ? "Medium"
      : popularity >= 40
      ? "Decent"
      : "Low";

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${popularityClass}`}>
      {popularity || "N/A"} - {popularityLabel}
    </span>
  );
};

PopularityBadge.propTypes = {
  popularity: PropTypes.number.isRequired,
};

export default PopularityBadge;
