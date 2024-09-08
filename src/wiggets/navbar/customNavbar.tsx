import { Link } from "react-router-dom";

// Create the Navbar component
function Navbar() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/boards">Boards</Link>
				</li>
				<li>
					<Link to="/buckets">Buckets</Link>
				</li>
				<li>
					<Link to="/items">Items</Link>
				</li>
				<li>
					<Link to="/addBoards">Add Boards</Link>
				</li>
				<li>
					<Link to="/addBuckets">Add Buckets</Link>
				</li>
				<li>
					<Link to="/addItems">Add Items</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
