import React, {useContext, useEffect, useState} from "react";
import {LoginContext, PostsContext} from "../../context/context";
import Unauthorized from "../loginform/unauthorized";
import BarChart from './BarChart';
import moment from "moment";
import {Card, CardContent, Typography} from "@mui/material";
import {
    AVERAGE_CHARACTERS_LENGTH_OR_POSTS_PER_MONTH,
    LONGEST_POST_BY_CHARACTER_LENGTH_PER_MMONTH
} from "../../query/user";
import {useQuery} from "@apollo/client";

function Statistics() {

    const {sltoken} = useContext(LoginContext);
    const {posts}   = useContext(PostsContext);
    const [average, setAverage] = useState([]);
    const [longestPost, setLongestPost] = useState([]);
    let messageLengthPosts = [];



    const {data: averageDataQQL, loading: loadingAverageDataQQL, errorAverageDataQQL} = useQuery(AVERAGE_CHARACTERS_LENGTH_OR_POSTS_PER_MONTH)
    const {data: longestPostDataQQL, loading: loadingLongestPostQQL, errorLongestPostQQL} = useQuery(LONGEST_POST_BY_CHARACTER_LENGTH_PER_MMONTH)
    useEffect(() => {
        if (!loadingAverageDataQQL)
            setAverage(averageDataQQL.averageCharactersLengthOfPostsPerMonth.flatMap( d => { return { xxx: d.month, yyy: d.averageCharacterLength } } ) );
        if (!loadingLongestPostQQL)
            setLongestPost(longestPostDataQQL.longestPostByCharacterLengthPerMonth.flatMap( d => { return { xxx: d.month, yyy: d.longestMessage } } ) );

    }, [averageDataQQL, longestPostDataQQL])


    if ( !sltoken )
        return <Unauthorized/>

    if ( !posts )
        return <div>No data, please load data</div>



    if ( posts )
    {

    }

    return <div>
        <h3>Statistics</h3>
        {/*<BarChart data={posts.flatMap( p => { return { year: parseInt( moment(p.created_time).format(`YYYY`) ), sales: 1000 } } )}/>*/}

        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Average character length of posts per month
                </Typography>
                <BarChart data={average}/>
            </CardContent>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Longest post by character length per month
                </Typography>
                <BarChart data={longestPost}/>
            </CardContent>
        </Card>

    </div>
}

export default Statistics;