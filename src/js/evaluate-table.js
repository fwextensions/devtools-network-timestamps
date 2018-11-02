import React from "react";
import {Tables, Columns} from "./constants";
import getData from "./evaluate-data";
import DataTable from "./data-table";
import copyRowsToClipboard from "./copy-rows";


export default class EvaluateTable extends React.Component {
	state = {
		columns: [],
		rows: []
	};


	constructor(
		props,
		context)
	{
		super(props, context);

		this.getRows(props.platform, props.type);
	}


	componentDidUpdate(
		prevProps)
	{
		const {platform, type} = this.props;

		if (prevProps.platform != platform || prevProps.type != type) {
			this.getRows(platform, type);
		}
	}


	getRows(
		platform,
		type)
	{
		const table = Tables[platform + type];

		if (table) {
			this.setState({ rows: [] });

			getData(table.namespaceID)
				.then(({layers, experiments}) => {
					this.setState({
						columns: Columns[type],
						rows: type == "Experiments" ? experiments : layers
					});
				});
		}
	}


	copyRows()
	{
		copyRowsToClipboard(this.state.rows, this.props.type);
	}


	render()
	{
		const state = this.state;

		return <DataTable
			{...this.props}
			columns={state.columns}
			rows={state.rows}
			sortColumn={"endsIn"}
			sortDirection={"ASC"}
		/>
	}
}
