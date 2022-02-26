import {useContext} from "react";
import {LoginContext} from "../../context/context";
import Unauthorized from "../loginform/unauthorized";

function Statistics( {posts} ) {
    const {loggedIn} = useContext(LoginContext);
    if ( !loggedIn )
        return <Unauthorized/>

    return <div>Statistics</div>
}

export default Statistics;