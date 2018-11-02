import React from "react";
import ReactDataGrid from "react-data-grid";


function sortRows(
	sortColumn,
	sortDirection,
	rows)
{
	function comparer(
		a,
		b)
	{
		const aCol = a[sortColumn];
		const bCol = b[sortColumn];

		if (aCol == bCol) {
			return 0;
		} else {
			return (aCol > bCol ? 1 : -1) * directionModifier;
		}
	}

	const directionModifier = (sortDirection == "ASC") ? 1 : -1;

	return sortDirection == "NONE" ? rows : rows.sort(comparer);
}


export default class DataTable extends React.Component {
	static getDerivedStateFromProps(
		props,
		currentState)
	{
		if (props.rows !== currentState.rows) {
			return {
				rows: props.rows,
				sortedRows: sortRows(currentState.sortColumn,
					currentState.sortDirection, props.rows.slice(0))
			};
		} else {
			return null;
		}
	}


	constructor(
		props,
		context)
	{
		super(props, context);

		const {rows, sortColumn, sortDirection} = props;

		this.state = {
			rows,
			sortColumn,
			sortDirection,
			sortedRows: sortRows(sortColumn, sortDirection, rows.slice(0))
		};
	}


	getRow = (i) => this.state.sortedRows[i];


	handleGridSort = (
		sortColumn,
		sortDirection) =>
	{
		const {rows, sortedRows} = this.state;

		this.setState({
			sortColumn,
			sortDirection,
			sortedRows: sortDirection == "NONE" ?
				rows.slice(0) : sortRows(sortColumn, sortDirection, sortedRows)
		});
	};


	render()
	{
		const {columns} = this.props;
		const {sortedRows} = this.state;

		return <ReactDataGrid
			columns={columns}
			rowsCount={sortedRows.length}
			rowGetter={this.getRow}
			onGridSort={this.handleGridSort}
			{...this.props}
		/>
	}
}