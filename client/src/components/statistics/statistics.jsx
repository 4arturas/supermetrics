import React, {useContext} from "react";
import {LoginContext, PostsContext} from "../../context/context";
import Unauthorized from "../loginform/unauthorized";
import BarChart from './BarChart';
import moment from "moment";

function Statistics() {

    const {sltoken} = useContext(LoginContext);
    const {posts}   = useContext(PostsContext);

    if ( !sltoken )
        return <Unauthorized/>

    if ( !posts )
        return <div>No data, please load data</div>

    return <div>
        <h3>Statistics</h3>
        <BarChart data={posts.flatMap( p => { return { year: moment(p.created_time).format(`YYYY`), sales: 1000 } } )}/>
    </div>
}

export default Statistics;