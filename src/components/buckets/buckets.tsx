import useIndexData from "../../utils/useIndexDB";
import { bucketsStoreName } from "./addBuckets";
import { Bucket } from "./bucket_interface";

const Buckets = () => {
	const { data: buckets } = useIndexData(bucketsStoreName) as {
		data: Bucket[];
	};

	return (
		<ul>
			{buckets?.map((bucket: Bucket) => (
				<li key={bucket.id}>{bucket.label}</li>
			))}
		</ul>
	);
};

export default Buckets;
