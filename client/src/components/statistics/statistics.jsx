import React, {useContext, useEffect, useState} from "react";
import {LoginContext, PostsContext} from "../../context/context";
import Unauthorized from "../loginform/unauthorized";
import {Card, CardContent, Typography} from "@mui/material";
import {
    AVERAGE_CHARACTERS_LENGTH_OF_POSTS_PER_MONTH, AVERAGE_NUMBER_OF_POSTS_PER_USER_PER_MONTH, GENERATE_RANDOM_POSTS,
    LONGEST_POST_BY_CHARACTER_LENGTH_PER_MMONTH, TOTAL_LONGEST_POST_BY_CHARACTER_LENGTH_PER_MONTH
} from "../../query/query";
import {useLazyQuery} from "@apollo/client";
import DataTable from "./DataTable";
import D3HorizontalBarChart from "./D3HorizontalBarChart";
import DataFetcher from "../posts/DataFetcher";

function Statistics() {

    const {sltoken} = useContext(LoginContext);
    const {posts}   = useContext(PostsContext);
    const [averageCharactersLengthOfPostsPerMonth, setAverageCharactersLengthOfPostsPerMonth]   = useState([]);
    const [longestPostByCharacterLengthPerMonth, setLongestPostByCharacterLengthPerMonth]       = useState([]);
    const [totalPostsSplitByWeekNumber, setTotalPostsSplitByWeekNumber]                         = useState([]);
    const [averageNumberOfPostsPerUserPerMonth, setAverageNumberOfPostsPerUserPerMonth]         = useState([]);

    const [firstCall] = useLazyQuery( AVERAGE_CHARACTERS_LENGTH_OF_POSTS_PER_MONTH,
        { onCompleted: res => {
                const d = res.averageCharactersLengthOfPostsPerMonth.flatMap( d => { return { xxx: d.month, yyy: d.averageCharacterLength } } );
                setAverageCharactersLengthOfPostsPerMonth( d );
            }
        } );

    const [secondCall] = useLazyQuery( LONGEST_POST_BY_CHARACTER_LENGTH_PER_MMONTH,
        { onCompleted: res => {
                const d = res.longestPostByCharacterLengthPerMonth.flatMap( d => { return { xxx: d.month, yyy: d.longestMessage } } );
                setLongestPostByCharacterLengthPerMonth(d);
                console.log( d );
            }
        } );

    const [thirdCall] = useLazyQuery( TOTAL_LONGEST_POST_BY_CHARACTER_LENGTH_PER_MONTH,
        { onCompleted: res => {
                const d = res.totalPostsSplitByWeekNumber.flatMap( d => { return { xxx: d.week, yyy: d.messagesCount } } );
                setTotalPostsSplitByWeekNumber(d);
            }
        } );

    const [forthCall] = useLazyQuery( AVERAGE_NUMBER_OF_POSTS_PER_USER_PER_MONTH,
        { onCompleted: res => {
                const d = res.averageNumberOfPostsPerUserPerMonth.flatMap( d => { return { xxx: d.from_id, yyy: d.averagePerMonth } } );
                setAverageNumberOfPostsPerUserPerMonth( d );
            }
        } );

    useEffect(() => {

        if ( posts )
        {
            firstCall();
            secondCall();
            thirdCall();
            forthCall()
        }
    }, [])



    if ( !sltoken )
        return <Unauthorized/>


    const callbackFunction = () =>
    {
        firstCall();
        secondCall();
        thirdCall();
        forthCall();
    }

    return <div>
        <h3>Statistics</h3>
        <DataFetcher callbackFunction={callbackFunction}/>
        { posts &&
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
        </Card> }

    </div>
}

export default Statistics;