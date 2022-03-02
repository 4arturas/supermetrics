import {useContext} from "react";
import {LoginContext, PostsContext} from "../../context/context";
import Unauthorized from "../unauthorized";
import EnhancedTable from "../EnhancedTable";
import DataFetcher from "../DataFetcher";


function Posts() {

    const {sltoken} = useContext(LoginContext);
    const {posts}   = useContext(PostsContext);

    if ( !sltoken )
        return <Unauthorized/>

    const callbackFunction = () => {

    }

    return <div>
        <h3>Posts</h3>
        <div><DataFetcher callbackFunction={callbackFunction}/></div>
        { posts && <EnhancedTable rows={posts}/> }
    </div>
}

export default Posts;