import { Buckets } from "./bucket_interface";

const dbName = "bucketsDB";
const storeName = "buckets";

export function addData(data: Buckets | unknown): IDBRequest {
	// Return type is IDBRequest for chaining
	const request = indexedDB.open(dbName, 1);

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

export function getData(): Promise<Buckets[]> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(dbName, 1);

		request.onsuccess = (event: Event) => {
			const db = (event.target as IDBOpenDBRequest)?.result;
			if (db) {
				const transaction = db.transaction(storeName, "readonly");
				const store = transaction.objectStore(storeName);
				const data: Buckets[] = [];

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
