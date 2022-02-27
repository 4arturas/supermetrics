import {useContext} from "react";
import {LoginContext} from "../../context/context";
import Unauthorized from "../loginform/unauthorized";

function Statistics() {
    const {contextData} = useContext(LoginContext);
    if ( !contextData.sl_token )
        return <Unauthorized/>

    console.log( contextData );

    return <div>
        <h3>Statistics</h3>
        Statistics
    </div>
}

export default Statistics;