import moment from "moment";

export class AverageNumberOfPostsPerUserPerMonth
{
    from_id: string;
    averagePerMonth: number;

    constructor(from_id: string, averagePerMonth: number) {
        this.from_id = from_id;
        this.averagePerMonth = averagePerMonth;
    }
}

export function averageNumberOfPostsPerUserPerMonth( posts: any ) : Array<AverageNumberOfPostsPerUserPerMonth>
{
    const postsPerUser = posts.reduce( (acc: any, post: any) => {
        const key = post.from_id;
        if (!acc[key])
            acc[key] = [];

        acc[key].push( post.created_time );

        return acc;
    }, {} );


    const postsPerUserPerMonth = Object.keys( postsPerUser ).map( from_id => {
        return {
            from_id: from_id,
            postsPerMonth: postsPerUser[from_id].reduce( (acc: any, created_time: any) => {
                const month = moment(created_time).format('YYYY-MM');
                if ( !acc[month] )
                    acc[month] = 0;
                acc[month]++;
                return acc;
            }, {} ) };
    });

    function avg( posts: any ) {
        return posts.reduce( (previous: any, current: any) => previous+current, 0 ) / posts.length;
    }

    return postsPerUserPerMonth.map( ( e ) => {
        return new AverageNumberOfPostsPerUserPerMonth( e.from_id, avg( Object.keys(e.postsPerMonth).map( month => { return e.postsPerMonth[month] } ) ));
    });
}