import moment from "moment";


const LayersBaseURL = "https://evaluate3-api.data.yahoo.com:4443/exp3_be/api/v3/layers?is_active=1&limit=100&namespace_id=";
const ExperimentsBaseURL = "https://evaluate3-api.data.yahoo.com:4443/exp3_be/api/v3/experiments?dir=desc&experiment_state=2&is_active=1&limit=100&namespace_id=";
const EndsSoonDays = 10;


function url(
	type,
	item)
{
	return `https://evaluate3.data.yahoo.com:4443/${type}s/${item.id}/details`;
}


function fetchJSON(
	url)
{
	return fetch(url, {
			"credentials": "include",
			"method": "GET",
			"mode": "cors"
		})
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				var err = new Error("Response: " + response.status + " " + response.statusText + "\n");

				err.response = response;
				throw err;
			}
		});
}


export default function getEvaluateData(
	namespaceID)
{
	return Promise.all([
		fetchJSON(LayersBaseURL + namespaceID),
		fetchJSON(ExperimentsBaseURL + namespaceID)
	])
		.then(([layerData, experimentData]) => {
			const layers = layerData.layers;
			const experiments = experimentData.experiments;
			const layersByID = {};
			const now = moment();

			layers.forEach(layer => {
				layersByID[layer.id] = layer;
				layer.experiments = [];
				layer.experimentCount = 0;
				layer.used = 0;
				layer.age = now.diff(moment(layer.created_date), "d");
				layer.url = url("layer", layer);
			});

			experiments.forEach(experiment => {
				const layer = layersByID[experiment.layer.id];
				const endDate = moment(experiment.end_date);

				var size = 0;

				if (endDate.isAfter(now)) {
					experiment.endsIn = endDate.diff(now, "d");
					experiment.endsSoon = experiment.endsIn <= EndsSoonDays;
					experiment.age = now.diff(experiment.start_date, "d");
					experiment.modified = now.diff(experiment.modified_date, "d");
					experiment.buckets.forEach(bucket => {
						size += bucket.sample_size;
					});
					experiment.size = size;

						// hoist some of the subkeys so they're available in the grid
					experiment.bucketCount = experiment.buckets.length;
					experiment.layerName = experiment.layer.name;
					experiment.url = url("experiment", experiment);

						// some experiments seem to be in the Mail namespace but
						// whose layers aren't, so we won't have fetched them and
						// layer will be undefined
					if (layer) {
						layer.experiments.push(experiment);
						layer.experimentCount++;
						layer.used += size;
						experiment.layerURL = url("layer", layer);
					}
				}
			});

			return {
				layers,
				experiments
			};
		});
}
