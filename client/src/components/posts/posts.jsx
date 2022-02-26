import {useContext} from "react";
import {LoginContext} from "../../context/context";
import Unauthorized from "../loginform/unauthorized";

function Posts( {posts} ) {

    const {loggedIn} = useContext(LoginContext);
    if ( !loggedIn )
        return <Unauthorized/>

    return <div>Posts</div>
}

export default Posts;