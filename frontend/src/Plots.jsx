import Plot from './Plot.jsx'

export default function Plots({plots=[]}){
    return (<div>
        <h2>Plots</h2>
        { plots.map( (plot,index) => {
            return (<Plot key={index} plot={plot} />)
        })}
    </div>)

}