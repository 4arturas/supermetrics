import {useContext, useEffect, useState} from "react";
import {LoginContext, PostsContext} from "../../context/context";
import Unauthorized from "../loginform/unauthorized";
import Button from "@mui/material/Button";
import {useLazyQuery} from "@apollo/client";
import {FETCH_SUPERMETRICS_POSTS, GENERATE_RANDOM_POSTS} from "../../query/user";

function Posts() {

    const {loggedIn}        = useContext(LoginContext);
    const {posts, setPosts} = useContext(PostsContext);

    const [fetchSupermetrics, { called: supermetricsCalled, loading: supermetricsLoading, data: supermetricsData }] = useLazyQuery( FETCH_SUPERMETRICS_POSTS );
    const [randomPosts, { called: randomCalled, loading: randomLoading, data: randomData }]                         = useLazyQuery( GENERATE_RANDOM_POSTS );

    const [data, setData] = useState( null );


    if ( !loggedIn )
        return <Unauthorized/>

/*    if (called && loading) return <p>Loading ...</p>
    if (!called) {
        return <button onClick={() => fetchSupermetrics()}>Load greeting</button>
    }*/

/*
    if (supermetricsData && supermetricsData.fetchSupermetricsPosts) {
        // console.log(supermetricsData.fetchSupermetricsPosts);
        // setPosts( supermetricsData.fetchSupermetricsPosts );
        const d = supermetricsData.fetchSupermetricsPosts;
        setData( d );
        // setData(  );
    }

    if (randomData?.generateRandomPosts) {
        console.log(randomData.generateRandomPosts);
        // setPosts( randomData.generateRandomPosts );
    }
*/

    return <div>
                <h3>Posts</h3>
                <Button color="primary" variant="contained" type="submit" onClick={ () => { fetchSupermetrics(); } } disabled={supermetricsLoading}>Fetch</Button> Supermetrics data
                <br/><br/>
                <Button color="primary" variant="contained" type="submit" onClick={ () => { randomPosts() } } disabled={randomLoading}>Generate</Button> random data<br/>
                {supermetricsData &&
                supermetricsData.fetchSupermetricsPosts &&
                supermetricsData.fetchSupermetricsPosts.map((c, i) => <div key={i}>{c.id}</div>)}
            </div>
}

export default Posts;