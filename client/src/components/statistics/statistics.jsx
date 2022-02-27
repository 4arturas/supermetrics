import {useContext} from "react";
import {LoginContext} from "../../context/context";
import Unauthorized from "../loginform/unauthorized";

function Statistics( {posts} ) {
    const {sltoken} = useContext(LoginContext);
    if ( !sltoken )
        return <Unauthorized/>

    return <div>Statistics</div>
}

export default Statistics;