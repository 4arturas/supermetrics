import {useContext} from "react";
import {LoginContext, PostsContext} from "../../context/context";
import Unauthorized from "../loginform/unauthorized";
import EnhancedTable from "./EnhancedTable";
import DataFetcher from "./DataFetcher";


function Posts() {

    const {sltoken} = useContext(LoginContext);
    const {posts}   = useContext(PostsContext);

    if ( !sltoken )
        return <Unauthorized/>

    return <div>
        <div><DataFetcher/></div>
        { posts && <EnhancedTable rows={posts}/> }
    </div>
}

export default Posts;