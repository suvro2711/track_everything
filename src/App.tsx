import "./App.css";
import Navbar from "./wiggets/navbar/customNavbar.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddBucket from "./components/buckets/addBuckets.tsx";
import AddBoard from "./components/boards/addBoard.tsx";
import AddItem from "./components/items/addItems.tsx";
import Boards from "./components/boards/boards.tsx";
import Items from "./components/items/items.tsx";
import Buckets from "./components/buckets/buckets.tsx";
import { useEffect } from "react";
import { initializeAllStores } from "./utils/indexDBUtils.ts";

function App() {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.register("service-worker.js");
	}

	useEffect(() => {
		initializeAllStores();
	}, []);

	return (
		<>
			<BrowserRouter>
				<button name="backButton" onClick={() => window.history.back()}>
					Back
				</button>
				<Navbar />
				<Routes>
					<Route path="/" Component={() => <div></div>} />
					<Route path="/boards" Component={Boards} />
					<Route path="/items" Component={Items} />
					<Route path="/buckets" Component={Buckets} />
					<Route path="/addBoards" Component={AddBoard} />
					<Route path="/addBuckets" Component={AddBucket} />
					<Route path="/addItems" Component={AddItem} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
