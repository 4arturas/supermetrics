import {useContext} from "react";
import {LoginContext} from "../../context/context";
import Unauthorized from "../loginform/unauthorized";

function Statistics( {posts} ) {
    const {contextData} = useContext(LoginContext);
    if ( !contextData )
        return <Unauthorized/>

    return <div>Statistics</div>
}

export default Statistics;