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
import * as d3 from 'd3'
import DataTable from "./DataTable";
import D3HorizontalBarChart from "./D3HorizontalBarChart";

function Statistics() {

    const {sltoken} = useContext(LoginContext);
    const {posts}   = useContext(PostsContext);
    const [averageCharactersLengthOfPostsPerMonth, setAverageCharactersLengthOfPostsPerMonth] = useState([]);
    const [longestPostByCharacterLengthPerMonth, setLongestPostByCharacterLengthPerMonth] = useState([]);
    const [totalPostsSplitByWeekNumber, setTotalPostsSplitByWeekNumber] = useState([]);
    const [averageNumberOfPostsPerUserPerMonth, setAverageNumberOfPostsPerUserPerMonth] = useState([]);


    const {data: averageDataQQL, loading: loadingAverageDataQQL} = useQuery(AVERAGE_CHARACTERS_LENGTH_OF_POSTS_PER_MONTH)
    const {data: longestPost1DataQQL, loading: loadingLongestPost1QQL} = useQuery(LONGEST_POST_BY_CHARACTER_LENGTH_PER_MMONTH)
    const {data: longestPost2DataQQL, loading: loadingLongestPost2QQL} = useQuery(TOTAL_LONGEST_POST_BY_CHARACTER_LENGTH_PER_MONTH)
    const {data: averageNumberOfPostsPerUserPerMonthData, loading: averageNumberOfPostsPerUserPerMonthLoading} = useQuery(AVERAGE_NUMBER_OF_POSTS_PER_USER_PER_MONTH)


    useEffect(() => {

        if (!loadingAverageDataQQL)
            setAverageCharactersLengthOfPostsPerMonth(averageDataQQL.averageCharactersLengthOfPostsPerMonth.flatMap( d => { return { xxx: d.month, yyy: d.averageCharacterLength } } ));

        if (!loadingLongestPost1QQL)
            setLongestPostByCharacterLengthPerMonth(longestPost1DataQQL.longestPostByCharacterLengthPerMonth.flatMap( d => { return { xxx: d.month, yyy: d.longestMessage } } ));

        if (!loadingLongestPost2QQL)
            setTotalPostsSplitByWeekNumber(longestPost2DataQQL.totalPostsSplitByWeekNumber.flatMap( d => { return { xxx: d.week, yyy: d.messagesCount } } ));

        if (!averageNumberOfPostsPerUserPerMonthLoading)
            setAverageNumberOfPostsPerUserPerMonth( averageNumberOfPostsPerUserPerMonthData.averageNumberOfPostsPerUserPerMonth.flatMap( d => { return { xxx: d.from_id, yyy: d.averagePerMonth } } ));

    }, [averageDataQQL, longestPost1DataQQL, longestPost2DataQQL, averageNumberOfPostsPerUserPerMonthData])


    if ( !sltoken )
        return <Unauthorized/>


    return <div>
        <h3>Statistics</h3>

        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Average character length of posts per month
                </Typography>
                {
                    averageCharactersLengthOfPostsPerMonth.length > 0 &&
                    <table style={{width:"100%"}}>
                        <tbody>
                            <tr>
                                <td style={{verticalAlign:"top"}}>
                                    <D3HorizontalBarChart data={averageCharactersLengthOfPostsPerMonth}/>
                                </td>
                                <td style={{verticalAlign:"top", paddingTop: "25px"}}>
                                    <DataTable xLabel="Month" yLabel="Average post length(characters)" data={averageCharactersLengthOfPostsPerMonth}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                }
            </CardContent>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Longest post by character length per month
                </Typography>
                {
                    longestPostByCharacterLengthPerMonth.length > 0 &&
                    <table style={{width:"100%"}}>
                        <tbody>
                            <tr>
                                <td style={{verticalAlign:"top"}}>
                                    <D3HorizontalBarChart data={longestPostByCharacterLengthPerMonth}/>
                                </td>
                                <td style={{verticalAlign:"top", paddingTop: "25px"}}>
                                    <DataTable xLabel="Month" yLabel="Longest Post(characters)" data={longestPostByCharacterLengthPerMonth}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    // d3HorizontalBarChart( 'longestPostByCharacterLengthPerMonthId', longestPostByCharacterLengthPerMonth.flatMap( d => { return { xxx: d.month, yyy: d.longestMessage } } ) )
                }
            </CardContent>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Total posts split by week number
                </Typography>
                {
                    totalPostsSplitByWeekNumber.length > 0 &&
                    <table style={{width:"100%"}}>
                        <tbody>
                            <tr>
                                <td style={{verticalAlign:"top"}}>
                                    <D3HorizontalBarChart data={totalPostsSplitByWeekNumber}/>
                                </td>
                                <td style={{verticalAlign:"top", paddingTop: "25px"}}>
                                    <DataTable xLabel="Week" yLabel="Posts number" data={totalPostsSplitByWeekNumber}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                }
            </CardContent>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Average number of posts per user per month
                </Typography>
                {
                    averageNumberOfPostsPerUserPerMonth.length > 0 &&
                    <table style={{width:"100%"}}>
                        <tbody>
                            <tr>
                                <td style={{verticalAlign:"top"}}>
                                    <D3HorizontalBarChart data={averageNumberOfPostsPerUserPerMonth}/>
                                </td>
                                <td style={{verticalAlign:"top", paddingTop: "25px"}}>
                                    <DataTable xLabel="User" yLabel="Posts number per month" data={averageNumberOfPostsPerUserPerMonth}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                }
            </CardContent>
        </Card>

    </div>
}

export default Statistics;