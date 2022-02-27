import {useContext, useEffect, useState} from "react";
import {LoginContext, PostsContext} from "../../context/context";
import Unauthorized from "../loginform/unauthorized";
import Button from "@mui/material/Button";
import {useLazyQuery} from "@apollo/client";
import {FETCH_SUPERMETRICS_POSTS, GENERATE_RANDOM_POSTS} from "../../query/user";
import EnhancedTable from "./EnhancedTable";
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& [role="separator"]': {
        margin: theme.spacing(0, 2),
    },
}));

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
            <Grid container>
                <Grid item xs>
                    <div><Button color="primary" variant="contained" type="submit" onClick={ () => { setData( null ); fetchSupermetrics(); } } disabled={supermetricsLoading}>Fetch</Button> Supermetrics data</div>
                </Grid>
                <Divider orientation="vertical" flexItem>
                </Divider>
                <Grid item xs>
                    <div style={{textAlign:"right"}}><Button color="primary" variant="contained" type="submit" onClick={ () => { setData( null ); randomPosts(); } } disabled={randomLoading}>Generate</Button> random data</div>
                </Grid>
                <Grid item xs={12}><br/>
                    {data && <EnhancedTable rows={data}/>}
                </Grid>
            </Grid>
                {/*{data && data.map((c, i) => <div key={i}>{c.id} - {c.from_name}</div>)}*/}
            </div>
}

export default Posts;