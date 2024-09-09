import { boardsStoreName } from "../components/boards/addBoard";
import { bucketsStoreName } from "../components/buckets/addBuckets";
import { itemsStoreName } from "../components/items/addItems";

export const mainDBName = "trackItemsDB";
export function addData(data: unknown, storeName: string): IDBRequest {
	// Return type is IDBRequest for chaining
	const request = indexedDB.open(mainDBName, 1);

	request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
		const db = (event.target as IDBOpenDBRequest)?.result;
		const store = db.createObjectStore(storeName, { keyPath: "id" });
		store.transaction.oncomplete = () => {
			store.put(data);
		};
	};

	request.onerror = (event: Event) => {
		const target = event.target as IDBOpenDBRequest;
		console.error("Error opening IndexedDB:", target.error);
	};

	request.onsuccess = (event: Event) => {
		const db = (event.target as IDBOpenDBRequest)?.result;
		if (db) {
			const transaction = db.transaction(storeName, "readwrite");
			const store = transaction.objectStore(storeName);
			store.put(data);
		}
	};

	return request; // Return the request object for potential chaining
}

export function getData(storeName: string): Promise<unknown[]> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(mainDBName, 1);

		request.onsuccess = (event: Event) => {
			const db = (event.target as IDBOpenDBRequest)?.result;
			if (db) {
				const transaction = db.transaction(storeName, "readonly");
				const store = transaction.objectStore(storeName);
				const data: unknown[] = [];

				store.openCursor().onsuccess = (event: Event) => {
					const cursor = (event.target as IDBRequest)?.result;
					if (cursor) {
						data.push(cursor.value);
						cursor.continue();
					} else {
						resolve(data);
					}
				};
			}
		};

		request.onerror = (event: Event) => {
			const target = event.target as IDBOpenDBRequest;
			console.error("Error opening IndexedDB:", target.error);
			reject(target.error);
		};
	});
}

export const initializeAllStores = () => {
	// This function is called when the app is first loaded
	const request = indexedDB.open(mainDBName, 1);

	request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
		const db = (event.target as IDBOpenDBRequest)?.result;
		const stores = [bucketsStoreName, itemsStoreName, boardsStoreName];
		stores.forEach((storeName) => {
			db.createObjectStore(storeName, { keyPath: "id" });
		});
	};
};
