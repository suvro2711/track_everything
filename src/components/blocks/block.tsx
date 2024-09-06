import { Buckets } from "../../utils/buckets/bucket_interface";

const bucket = ({ details }: { details: Buckets }) => {
	return (
		<div>
			{details.label} : {details.value}
		</div>
	);
};

export default bucket;
