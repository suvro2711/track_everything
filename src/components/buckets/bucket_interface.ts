export interface Bucket {
	label: string;
	id: string;
	childBucketIds?: string[];
	itemIds?: string[];
	boardId: string;
}
