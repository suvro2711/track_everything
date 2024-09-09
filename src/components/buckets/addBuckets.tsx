import { addData } from "../../utils/indexDBUtils";
import useIndexData from "../../utils/useIndexDB";
import { generateRandomGUID } from "../../utils/utils";
import { boardsStoreName } from "../boards/addBoard";
import { Board } from "../boards/borad_interface.";
import { Bucket } from "./bucket_interface";

export const bucketsStoreName = "buckets";

const AddBucket = () => {
	const { data: boards } = useIndexData(boardsStoreName) as {
		data: Board[];
	};

	const handleAddBucket = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addData(
			{
				label: event.currentTarget.label.value,
				boardId: event.currentTarget.boardId.value,
				id: generateRandomGUID(),
			} as Bucket,
			bucketsStoreName
		);
	};
	return (
		<form onSubmit={handleAddBucket}>
			<input type="text" name="label" placeholder="Label" />
			<select name="boardId">
				{boards?.map((bucket: Board) => (
					<option key={bucket.id} value={bucket.id}>
						{bucket.label}
					</option>
				))}
			</select>
			<button type="submit">Add Bucket</button>
		</form>
	);
};

export default AddBucket;
