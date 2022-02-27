import {useContext, useEffect, useState} from "react";
import {LoginContext, PostsContext} from "../../context/context";
import Unauthorized from "../loginform/unauthorized";
import Button from "@mui/material/Button";
import {useLazyQuery} from "@apollo/client";
import {FETCH_SUPERMETRICS_POSTS, GENERATE_RANDOM_POSTS} from "../../query/user";

function ShowData( { data } )
{

}

function Posts() {

    const {loggedIn}        = useContext(LoginContext);
    const {posts, setPosts} = useContext(PostsContext);
    const [data, setData] = useState(null);

    const [fetchSupermetrics, { called: supermetricsCalled, loading: supermetricsLoading, data: supermetricsData }] = useLazyQuery( FETCH_SUPERMETRICS_POSTS );
    const [randomPosts, { called: randomCalled, loading: randomLoading, data: randomData }]                         = useLazyQuery( GENERATE_RANDOM_POSTS );

    if ( !loggedIn )
        return <Unauthorized/>

    if ( supermetricsData && supermetricsData.fetchSupermetricsPosts )
    {
        if ( !data )
            setData( supermetricsData.fetchSupermetricsPosts );
    }

    if ( randomData && randomData.generateRandomPosts )
    {
        if ( !data )
            setData( randomData.generateRandomPosts );
    }


    return <div>
                <h3>Posts</h3>
                <Button color="primary" variant="contained" type="submit" onClick={ () => { setData( null ); fetchSupermetrics(); } } disabled={supermetricsLoading}>Fetch</Button> Supermetrics data
                <br/><br/>
                <Button color="primary" variant="contained" type="submit" onClick={ () => { setData( null ); randomPosts() } } disabled={randomLoading}>Generate</Button> random data<br/>
                {data && data.map((c, i) => <div key={i}>{c.id} - {c.from_name}</div>)}
            </div>
}

export default Posts;