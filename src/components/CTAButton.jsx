import { Link } from "react-router-dom";

const CTAButton = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="inline-block bg-cyan-900 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300"
    >
      {text}
    </Link>
  );
};

export default CTAButton;