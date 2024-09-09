import { addData } from "../../utils/indexDBUtils";
import useIndexData from "../../utils/useIndexDB";
import { generateRandomGUID } from "../../utils/utils";
import { bucketsStoreName } from "../buckets/addBuckets";
import { Bucket } from "../buckets/bucket_interface";
import { Item } from "./items_interface";

export const itemsStoreName = "items";

const Additem = () => {
	const { data: buckets } = useIndexData(bucketsStoreName) as {
		data: Bucket[];
	};

	const handleAdditem = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addData(
			{
				label: event.currentTarget.label.value,
				id: generateRandomGUID(),
				bucketId: event.currentTarget.bucketId.value,
				otherbucketId: event.currentTarget.otherbucketId.value,
				createdAt: Date.now(),
				value: event.currentTarget.value.value,
			} as Item,
			itemsStoreName
		);
	};

	return (
		<form onSubmit={handleAdditem}>
			<input type="text" name="label" placeholder="Label" />
			<input type="number" name="value" placeholder="Value" />
			<select name="bucketId">
				{buckets?.map((bucket: Bucket) => (
					<option key={bucket.id} value={bucket.id}>
						{bucket.label}
					</option>
				))}
			</select>
			<select name="otherbucketId" multiple>
				{buckets?.map((bucket: Bucket) => (
					<option key={bucket.id} value={bucket.id}>
						{bucket.label}
					</option>
				))}
			</select>
			<input type="text" name="bucketId" placeholder="Other Buckets" />
			<button type="submit">Add Item</button>
		</form>
	);
};

export default Additem;
