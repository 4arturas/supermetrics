function DataTable( { xLabel, yLabel, data } )
{
    const table = (
        <table border="1" cellPadding="5" cellSpacing="0">
            <thead style={{backgroundColor:"#1765C0", color:"white"}}>
            <tr>
                <th style={{fontStyle:"italic"}}>{xLabel}</th>
                <th style={{fontStyle:"italic"}}>{yLabel}</th>
            </tr>
            </thead>
            <tbody>
            {data.map( (d,i) => <tr key={'t'+i}><td key={'x'+i} style={{fontWeight:"bold"}}>{d.xxx}</td><td key={'y'+i}>{d.yyy}</td></tr> )}
            </tbody>
        </table>
    );

    return table;
}
export default DataTable;