import useIndexData from "../../utils/useIndexDB";
import { boardsStoreName } from "./addBoard";
import { Board } from "./borad_interface.";

const Boards = () => {
	const { data: boards } = useIndexData(boardsStoreName) as {
		data: Board[];
	};

	return (
		<ul>
			{boards?.map((board: Board) => (
				<li key={board.id}>{board.label}</li>
			))}
		</ul>
	);
};

export default Boards;
