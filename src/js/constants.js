import {
	PercentFormatter,
	LinkFormatter,
	EndsInFormatter,
	NameFormatter,
	TitleFormatter
} from "./formatters";


const XS = 50;
const S = 80;
const M = 150;
const L = 400;


export const Tables = {
	desktopExperiments: {
		title: "Desktop Experiments",
		namespaceID: 4151
	},
	desktopLayers: {
		title: "Desktop Layers",
		namespaceID: 4151
	},
	iosExperiments: {
		title: "iOS Experiments",
		namespaceID: 4428
	},
	iosLayers: {
		title: "iOS Layers",
		namespaceID: 4428
	},
	androidExperiments: {
		title: "Android Experiments",
		namespaceID: 4189
	},
	androidLayers: {
		title: "Android Layers",
		namespaceID: 4189
	}
};
export const ColumnNames = {
	Layers: ["Name", "Age", "Author", "Experiments", "Pct", "Used", "Details"],
	Experiments: ["Name", "Author", "Buckets", "Size", "", "Ends In", "Age", "Mod", "Layer", "Details"]
};
export const Columns = {
	Layers: [
		col("Name", "name", L, {
			resizable: true,
			formatter: NameFormatter,
			getRowMetaData: ({endsSoon}, column) => ({ endsSoon })
		}),
		col("Author", "created_by", M, { resizable: true }),
		col("Age", "age", S),
		col("Experiments", "experimentCount", 110),
		col("Used", "used", S, { formatter: PercentFormatter }),
		col("ID", "url", S, {
			formatter: LinkFormatter,
			getRowMetaData: ({id}, column) => ({ text: id })
		})
	],
	Experiments: [
		col("Name", "name", L, {
			resizable: true,
			formatter: NameFormatter,
			getRowMetaData: ({endsSoon}, column) => ({ endsSoon })
		}),
		col("Author", "created_by", M, { resizable: true }),
		col("Buckets", "bucketCount", S),
		col("Size", "size", S, { formatter: PercentFormatter }),
		col("Ends In", "endsIn", S, {
			formatter: EndsInFormatter,
			getRowMetaData: ({endsSoon}, column) => ({ endsSoon })
		}),
		col("Age", "age", S),
		col("Change", "modified", S, {
			formatter: TitleFormatter,
			getRowMetaData: ({modified, modified_by}, column) => ({
				text: modified,
				title: modified_by
			})
		}),
		col("Layer", "layerURL", M, {
			formatter: LinkFormatter,
			getRowMetaData: ({layerName}, column) => ({ text: layerName })
		}),
		col("ID", "url", XS, {
			formatter: LinkFormatter,
			getRowMetaData: ({id}, column) => ({ text: id })
		}),
		col("Bucket Names", "buckets", M, {
			resizable: true,
			formatter: TitleFormatter,
			getRowMetaData: ({buckets}, column) => {
				const text = buckets.map(bucket => bucket.display_name).join(", ");

				return {
					text: text,
					title: text
				};
			}
		})
	]
};


function col(
	name,
	key,
	width,
	options)
{
	const column = {
		name,
		key,
		sortable: true,
		...options
	};

	if (width) {
		column.width = width;
	}

	return column;
}
