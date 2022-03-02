import moment from "moment";

export class TotalPostsSplitByWeekNumber
{
    week: string;
    messagesCount: number;

    constructor(week: string, messagesCount: number) {
        this.week = week;
        this.messagesCount = messagesCount;
    }
}
export function totalPostsSplitByWeekNumber( posts: any ) : Array<TotalPostsSplitByWeekNumber>
{
    const totalPostsByWeek = posts.reduce( (acc: any, post: any) => {
        const date = moment(post.created_time, 'YYYY-MM-DD[T]HH:mm:ss');
        const year = date.year();
        const weekNumber = date.week();
        const keyYearWeekNumber = year + '-' + weekNumber;
        if (!acc[keyYearWeekNumber])
            acc[keyYearWeekNumber] = 0;

        acc[keyYearWeekNumber]++;

        return acc;
    }, {} );
    return Object.keys(totalPostsByWeek).map( week => {
        return new TotalPostsSplitByWeekNumber( week, totalPostsByWeek[week] );
    } );
}