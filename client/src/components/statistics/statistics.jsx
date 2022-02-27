import React, {useContext} from "react";
import {LoginContext, PostsContext} from "../../context/context";
import Unauthorized from "../loginform/unauthorized";
import BarChart from './BarChart';
import moment from "moment";

function Statistics() {
    const {contextData} = useContext(LoginContext);
    const {posts}       = useContext(PostsContext);
    if ( !contextData.sl_token )
        return <Unauthorized/>

    console.log( posts );

    return <div>
        <h3>Statistics</h3>
        <BarChart data={posts.flatMap( p => { return { year: moment(p.created_time).format(`YYYY`), sales: 1000 } } )}/>
    </div>
}

export default Statistics;