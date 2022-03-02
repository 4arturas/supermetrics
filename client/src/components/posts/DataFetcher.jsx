import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import {CircularProgress} from "@mui/material";
import Button from "@mui/material/Button";
import {useLazyQuery} from "@apollo/client";
import {useContext, useState} from "react";
import {LoginContext, PostsContext} from "../../context/context";
import Unauthorized from "../loginform/unauthorized";
import {FETCH_SUPERMETRICS_POSTS, GENERATE_RANDOM_POSTS} from "../../graphql/query";

const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& [role="separator"]': {
        margin: theme.spacing(0, 2),
    },
}));

function DataFetcher( {callbackFunction} )
{
    const {sltoken}                     = useContext(LoginContext);
    const {setPosts}                    = useContext(PostsContext);
    const [loadingData, setLoadingData] = useState( false );

    const [fetchSupermetrics, { called: supermetricsCalled, loading: supermetricsLoading, data: supermetricsData }] =
        useLazyQuery( FETCH_SUPERMETRICS_POSTS, { variables: { sl_token: sltoken }, onCompleted: supermetricsPosts => {
            setPosts( supermetricsPosts.fetchSupermetricsPosts );
            setLoadingData( false );
            callbackFunction();
        } } );

    const [randomPosts, { called: randomCalled, loading: randomLoading, data: randomData }] =
        useLazyQuery( GENERATE_RANDOM_POSTS, { onCompleted: randomPosts => {
            setPosts( randomPosts.generateRandomPosts );
            setLoadingData( false );
            callbackFunction();
        } } );

    const handleSupermetricsPosts = (event) => {
        event.preventDefault();
        setLoadingData(true);
        setPosts( null );
        fetchSupermetrics();
    }

    const handleRandomPosts = (event) => {
        event.preventDefault();
        setLoadingData( true );
        setPosts( null );
        randomPosts();
    }

    if ( !sltoken )
        return <Unauthorized/>

    return (
        <Grid container>
            <Grid item xs>
                <div>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={handleSupermetricsPosts} disabled={loadingData}>Fetch</Button> Supermetrics data
                </div>
            </Grid>
            <Divider orientation="vertical" flexItem>
            </Divider>
            <Grid item xs>
                <div style={{textAlign:"right"}}>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={handleRandomPosts} disabled={loadingData}>Generate</Button> random data
                </div>
            </Grid>
            <Grid item xs={12}><br/>
                { loadingData && <CircularProgress color="primary" /> }
            </Grid>
        </Grid> )
}
export default DataFetcher;