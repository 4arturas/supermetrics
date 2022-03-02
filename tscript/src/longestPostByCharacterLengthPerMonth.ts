import moment from "moment";

export class LongestPostByCharacterLengthPerMonth
{
    month: string;
    longestMessage: number;

    constructor(month: string, longestMessage: number) {
        this.month = month;
        this.longestMessage = longestMessage;
    }
}

export function longestPostByCharacterLengthPerMonth( posts: any ) : Array<LongestPostByCharacterLengthPerMonth>
{
    const longestMessageLengthPerMonth = posts.reduce( (acc: any, post: any) => {
        const month = moment(post.created_time).format('YYYY-MM');
        if (!acc[month])
            acc[month] = -1;

        if ( post.message.length > acc[month] )
            acc[month] = post.message.length;

        return acc;
    }, {} );
    return Object.keys(longestMessageLengthPerMonth)
        .map( month => {
            return new LongestPostByCharacterLengthPerMonth(month, longestMessageLengthPerMonth[month] );
        } );
}