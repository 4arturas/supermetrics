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

function Statistics() {

    const {sltoken} = useContext(LoginContext);
    const {posts}   = useContext(PostsContext);
    const [averageCharactersLengthOfPostsPerMonth, setAverageCharactersLengthOfPostsPerMonth] = useState([]);
    const [longestPostByCharacterLengthPerMonth, setLongestPostByCharacterLengthPerMonth] = useState([]);
    const [totalPostsSplitByWeekNumber, setTotalPostsSplitByWeekNumber] = useState([]);
    const [averageNumberOfPostsPerUserPerMonth, setAverageNumberOfPostsPerUserPerMonth] = useState([]);


    const {data: averageDataQQL, loading: loadingAverageDataQQL, errorAverageDataQQL} = useQuery(AVERAGE_CHARACTERS_LENGTH_OF_POSTS_PER_MONTH)
    const {data: longestPost1DataQQL, loading: loadingLongestPost1QQL, errorLongestPost1QQL} = useQuery(LONGEST_POST_BY_CHARACTER_LENGTH_PER_MMONTH)
    const {data: longestPost2DataQQL, loading: loadingLongestPost2QQL, errorLongestPost2QQL} = useQuery(TOTAL_LONGEST_POST_BY_CHARACTER_LENGTH_PER_MONTH)
    const {data: averageNumberOfPostsPerUserPerMonthData, loading: averageNumberOfPostsPerUserPerMonthLoading, averageNumberOfPostsPerUserPerMonthError} = useQuery(AVERAGE_NUMBER_OF_POSTS_PER_USER_PER_MONTH)

    const d3HorizontalBarChart = ( containerId, data ) =>
    {

        const maxYYY = data.sort( function( a, b ) { return b.yyy > a.yyy } )[0].yyy;

        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 30, bottom: 40, left: 90},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        var svg = d3.select(container)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");



            // Add X axis
            var x = d3.scaleLinear()
                .domain([0, maxYYY])
                .range([ 0, width]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            // Y axis
            var y = d3.scaleBand()
                .range([ 0, height ])
                .domain(data.map(function(d) { return d.xxx; }))
                .padding(.1);
            svg.append("g")
                .call(d3.axisLeft(y))

            //Bars
            svg.selectAll("myRect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", x(0) )
                .attr("y", function(d) { return y(d.xxx); })
                .attr("width", function(d) { return x(d.yyy); })
                .attr("height", y.bandwidth() )
                .attr("fill", "#69b3a2");


            // .attr("x", function(d) { return x(d.xxx); })
            // .attr("y", function(d) { return y(d.yyy); })
            // .attr("width", x.bandwidth())
            // .attr("height", function(d) { return height - y(d.yyy); })
            // .attr("fill", "#69b3a2")

    }
    useEffect(() => {

        if (!loadingAverageDataQQL)
            setAverageCharactersLengthOfPostsPerMonth(averageDataQQL.averageCharactersLengthOfPostsPerMonth);


        if (!loadingLongestPost1QQL)
            setLongestPostByCharacterLengthPerMonth(longestPost1DataQQL.longestPostByCharacterLengthPerMonth);

        if (!loadingLongestPost2QQL)
            setTotalPostsSplitByWeekNumber(longestPost2DataQQL.totalPostsSplitByWeekNumber);

        if (!averageNumberOfPostsPerUserPerMonthLoading)
            setAverageNumberOfPostsPerUserPerMonth( averageNumberOfPostsPerUserPerMonthData.averageNumberOfPostsPerUserPerMonth);

    }, [])


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
                <div id="averageCharactersLengthOfPostsPerMonthId"></div>
                {
                    averageCharactersLengthOfPostsPerMonth.length > 0 &&
                    d3HorizontalBarChart( 'averageCharactersLengthOfPostsPerMonthId', averageCharactersLengthOfPostsPerMonth.flatMap( d => { return { xxx: d.month, yyy: d.averageCharacterLength } } ) )
                }
            </CardContent>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Longest post by character length per month
                </Typography>
                <div id="longestPostByCharacterLengthPerMonthId"></div>
                {
                    longestPostByCharacterLengthPerMonth.length > 0 &&
                    d3HorizontalBarChart( 'longestPostByCharacterLengthPerMonthId', longestPostByCharacterLengthPerMonth.flatMap( d => { return { xxx: d.month, yyy: d.longestMessage } } ) )
                }
            </CardContent>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Total posts split by week number
                </Typography>
                <div id="totalPostsSplitByWeekNumberId"></div>
                {
                    totalPostsSplitByWeekNumber.length > 0 &&
                    d3HorizontalBarChart( 'totalPostsSplitByWeekNumberId', totalPostsSplitByWeekNumber.flatMap( d => { return { xxx: d.week, yyy: d.messagesCount } } ) )
                }
            </CardContent>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Average number of posts per user per month
                </Typography>
                <div id="averageNumberOfPostsPerUserPerMonthId"></div>
                {
                    averageNumberOfPostsPerUserPerMonth.length > 0 &&
                    d3HorizontalBarChart( 'averageNumberOfPostsPerUserPerMonthId', averageNumberOfPostsPerUserPerMonth.flatMap( d => { return { xxx: d.from_id, yyy: d.averagePerMonth } } ) )
                }
            </CardContent>
        </Card>

    </div>
}

export default Statistics;