import { addData } from "../../utils/indexDBUtils";
import { generateRandomGUID } from "../../utils/utils";
import { Board } from "./borad_interface.";

export const boardsDBName = "boardDB";
export const boardsStoreName = "boards";

const AddBoard = () => {
	const handleAddBoard = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		addData(
			{
				label: event.currentTarget.label.value,
				id: generateRandomGUID(),
			} as Board,
			boardsDBName,
			boardsStoreName
		);
	};

	return (
		<form onSubmit={handleAddBoard}>
			<input type="text" name="label" placeholder="Label" />
			<button type="submit">Add Board</button>
		</form>
	);
};

export default AddBoard;
