import { useEffect, useState } from "react";
import { getData, mainDBName } from "./indexDBUtils";

const useIndexData = (storeName: string) => {
	const [data, setData] = useState<unknown>(null);

	useEffect(() => {
		const fetchAllData = async () => {
			const data: unknown[] = await getData(mainDBName, storeName);
			setData(data);
		};
		fetchAllData();
	}, [storeName]);

	return { data };
};

export default useIndexData;
