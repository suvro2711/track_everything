import useIndexData from "../../utils/useIndexDB";
import { itemsStoreName } from "./addItems";
import { Item } from "./items_interface";

const Items = () => {
	const { data: items } = useIndexData(itemsStoreName) as {
		data: Item[];
	};

	return (
		<ul>
			{items?.map((item: Item) => (
				<li key={item.id}>
					{item.label} : {item.value}
				</li>
			))}
		</ul>
	);
};

export default Items;
