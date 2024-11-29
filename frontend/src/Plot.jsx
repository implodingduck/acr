import { BackendApi } from "./BackendApi";

export default function Plots({plot={}}){

    const api = new BackendApi();

    const handleCollect = async (e) => {
        console.log(`Collect: ${plot.id}`)
        const collectedPlot = await api.collectPlot(plot.id)
        console.log(collectedPlot)
        alert(`Collected ${collectedPlot.gathered_resources} [${collectedPlot.resource}]`)

    }

    return (<>
        <button onClick={handleCollect}>{plot.building.name} [{plot.building.resource}]</button>
        <pre>
            {JSON.stringify(plot)}
        </pre>
    </>)

}