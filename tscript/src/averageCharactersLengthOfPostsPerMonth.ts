import moment from "moment";

export class AverageCharLengthOfPostsPerMonth {
    month: string;
    averageCharacterLength: number;

    constructor(month: string, averageCharacterLength: number) {
        this.month = month;
        this.averageCharacterLength = averageCharacterLength;
    }
}

// const user: AverageCharLengthOfPostsPerMonth = new AverageCharLengthOfPostsPerMonth("Murphy", 1);

export function averageCharactersLengthOfPostsPerMonth( posts : any ) : Array<AverageCharLengthOfPostsPerMonth>
{
    const totalCharactersLengthPerMonth = posts.reduce( (acc : any, post : any) => {
        let month = moment(post.created_time).format('YYYY-MM');
        if (!acc[month])
            acc[month] = [];
        acc[month].push(post.message.length);
        return acc;
    }, {} );

    return Object.keys( totalCharactersLengthPerMonth )
        .map( ( month ) => {
            return new AverageCharLengthOfPostsPerMonth(month, totalCharactersLengthPerMonth[month].reduce( ( previous : number, current : number ) => previous + current , 0 ) / totalCharactersLengthPerMonth[month].length );
        } );
}