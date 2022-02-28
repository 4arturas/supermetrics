import React, {useContext, useEffect, useState} from "react";
import {LoginContext, PostsContext} from "../../context/context";
import Unauthorized from "../loginform/unauthorized";
import BarChart from './BarChart';
import {Card, CardContent, Typography} from "@mui/material";
import {
    AVERAGE_CHARACTERS_LENGTH_OF_POSTS_PER_MONTH, AVERAGE_NUMBER_OF_POSTS_PER_USER_PER_MONTH,
    LONGEST_POST_BY_CHARACTER_LENGTH_PER_MMONTH, TOTAL_LONGEST_POST_BY_CHARACTER_LENGTH_PER_MONTH
} from "../../query/user";
import {useQuery} from "@apollo/client";

function Statistics() {

    const {sltoken} = useContext(LoginContext);
    const {posts}   = useContext(PostsContext);
    const [average, setAverage] = useState([]);
    const [longestPost, setLongestPost] = useState([]);
    const [longestPost2, setLongestPost2] = useState([]);
    const [averageNumberOfPostsPerUserPerMonth, setAverageNumberOfPostsPerUserPerMonth] = useState([]);


    const {data: averageDataQQL, loading: loadingAverageDataQQL, errorAverageDataQQL} = useQuery(AVERAGE_CHARACTERS_LENGTH_OF_POSTS_PER_MONTH)
    const {data: longestPost1DataQQL, loading: loadingLongestPost1QQL, errorLongestPost1QQL} = useQuery(LONGEST_POST_BY_CHARACTER_LENGTH_PER_MMONTH)
    const {data: longestPost2DataQQL, loading: loadingLongestPost2QQL, errorLongestPost2QQL} = useQuery(TOTAL_LONGEST_POST_BY_CHARACTER_LENGTH_PER_MONTH)
    const {data: averageNumberOfPostsPerUserPerMonthData, loading: averageNumberOfPostsPerUserPerMonthLoading, averageNumberOfPostsPerUserPerMonthError} = useQuery(AVERAGE_NUMBER_OF_POSTS_PER_USER_PER_MONTH)
    useEffect(() => {

        if (!loadingAverageDataQQL)
            setAverage(averageDataQQL.averageCharactersLengthOfPostsPerMonth);

        if (!loadingLongestPost1QQL)
            setLongestPost(longestPost1DataQQL.longestPostByCharacterLengthPerMonth);

        if (!loadingLongestPost2QQL)
            setLongestPost2(longestPost2DataQQL.totalPostsSplitByWeekNumber);

        if (!averageNumberOfPostsPerUserPerMonthLoading)
            setAverageNumberOfPostsPerUserPerMonth( averageNumberOfPostsPerUserPerMonthData.averageNumberOfPostsPerUserPerMonth);

    }, [averageDataQQL, longestPost1DataQQL, longestPost2DataQQL, averageNumberOfPostsPerUserPerMonthData])


    if ( !sltoken )
        return <Unauthorized/>


    return <div>
        <h3>Statistics</h3>
        {/*<BarChart data={posts.flatMap( p => { return { year: parseInt( moment(p.created_time).format(`YYYY`) ), sales: 1000 } } )}/>*/}

        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Average character length of posts per month
                </Typography>
                <BarChart data={ average.flatMap( d => { return { xxx: d.month, yyy: d.averageCharacterLength } } )}/>
            </CardContent>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Longest post by character length per month
                </Typography>
                <BarChart data={longestPost.flatMap( d => { return { xxx: d.month, yyy: d.longestMessage } } )}/>
            </CardContent>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Total posts split by week number
                </Typography>
                <BarChart data={longestPost2.flatMap( d => { return { xxx: d.week, yyy: d.messagesCount } } )}/>
            </CardContent>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Average number of posts per user per month
                </Typography>
                <BarChart data={averageNumberOfPostsPerUserPerMonth.flatMap( d => { return { xxx: d.from_id, yyy: (d.averagePerMonth) } } )}/>
            </CardContent>
        </Card>

    </div>
}

export default Statistics;