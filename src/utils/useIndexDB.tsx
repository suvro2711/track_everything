import { useEffect, useState } from "react";
import { getData } from "./indexDBUtils";

const useIndexData = (storeName: string) => {
	const [data, setData] = useState<unknown>(null);

	useEffect(() => {
		const fetchAllData = async () => {
			const data: unknown[] = await getData(storeName);
			setData(data);
		};
		fetchAllData();
	}, [storeName]);

	return { data };
};

export default useIndexData;
