import {ColumnNames} from "./constants";


const RowMappers = {
	Layers: (l, i) => [
		l.name,
		l.age,
		l.created_by,
		l.experiments.length,
		l.used,
		sparkline("E", i),
		link("layer", l, l.id)
	],
	Experiments: (e, i) => [
		e.name,
		e.created_by,
		e.buckets.length,
		e.size,
		sparkline("D", i),
		e.endsIn,
		e.age,
		e.modified,
		link("layer", e.layer, e.layer.name),
		link("experiment", e, e.id)
	]
};


export default function copyRowsToClipboard(
	rows,
	type)
{
	copyTextToClipboard(generateRows(ColumnNames[type], rows, RowMappers[type]));
}


function generateRows(
	columnNames,
	items,
	mapper)
{
	return [].concat(tsvRow(columnNames), items.map((item, i) => tsvRow(mapper(item, i))))
		.join("\n");
}


function tsvRow(
	...columns)
{
	columns = columns.length == 1 ? [].concat(columns[0]) : columns;

	return columns.join("\t");
}


function sparkline(
	col,
	row)
{
	return `=SPARKLINE(${col}${row + 2},{"charttype","bar";"max",100})`;
}


function link(
	type,
	item,
	text)
{
	return `=HYPERLINK("https://evaluate3.data.yahoo.com:4443/${type}s/${item.id}/details", "${text}")`;
}


function copyTextToClipboard(
	text)
{
	var copyFrom = document.createElement("textarea"),
		body = document.body,
		activeElement = document.activeElement,
		result;

	copyFrom.textContent = text;
	body.appendChild(copyFrom);
	copyFrom.focus();
	copyFrom.select();
	result = document.execCommand("copy");
	body.removeChild(copyFrom);

	if (!result) {
		alert("The browser blocked the copy action for some reason.");
	}

	if (activeElement) {
			// refocus the previously active element, since we stole the
			// focus to copy the text from the temp textarea
		activeElement.focus();
	}
}
