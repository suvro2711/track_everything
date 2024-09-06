import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Buckets } from "./utils/buckets/bucket_interface";
import { addData, getData } from "./utils/indexDBUtils";

const bucketsDBName = "bucketsDB";
const bucketsStoreName = "buckets";

function App() {
	const [count, setCount] = useState(0);
	const [buckets, setBuckets] = useState<Buckets[]>([]);

	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.register("service-worker.js");
	}

	const fetchBuckets = async () => {
		const buckets = (await getData(
			bucketsDBName,
			bucketsStoreName
		)) as Buckets[];
		setBuckets(buckets);
	};

	useEffect(() => {
		fetchBuckets();
	}, []);

	const handleAddBucket = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addData(
			{
				label: event.currentTarget.label.value,
				value: event.currentTarget.value.value,
				id: Math.random().toString(36).substring(7),
			} as Buckets,
			bucketsDBName,
			bucketsStoreName
		);

		fetchBuckets();
	};

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<div>
				<h2>Added Buckets:</h2>
				<ul>
					{buckets.map((bucket) => (
						<li key={bucket.id}>
							<span>{bucket.label}: </span>
							<span>{bucket.value}</span>
						</li>
					))}
				</ul>
			</div>
			<form onSubmit={handleAddBucket}>
				<input type="text" />
				<input type="text" name="label" placeholder="Label" />
				<input type="text" name="value" placeholder="Value" />
				<button type="submit">Add Bucket</button>
			</form>
		</>
	);
}

export default App;
