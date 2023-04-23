import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <Link to="/">
        <button className="navButton"> Home </button>
      </Link>

      <Link to="/create">
        <button className="navButton"> Create Post </button>
      </Link>
      
    </div>
  );
}
