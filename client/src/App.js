import './App.css'

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Lists from "@mui/icons-material/ListAlt";

import {BrowserRouter as Router, NavLink, Route, Routes} from 'react-router-dom'
import {Grid} from "@mui/material";

import Posts from "./components/posts/posts";
import Statistics from "./components/statistics/statistics";
import {useState} from "react";
import Loginform from "./components/loginform/Loginform";
import {LoginContext, PostsContext} from "./context/context";

const App = () => {

  const [sltoken, setSltoken]   = useState(null);
  const [posts, setPosts]   = useState(null );

  return (
      <LoginContext.Provider value={{sltoken, setSltoken}}>
          <PostsContext.Provider value={{posts, setPosts}}>
              { !sltoken ?
              <Grid container justifyContent="center"><Loginform/></Grid> :
              <Router>
                <Grid container justifyContent="center">
                  <Grid item xs={2}>
                    <div className="sidebar">
                      <NavLink to="/posts" className={({isActive}) => 'link' + (isActive ? ' activeLink' : '')}>
                        <PermIdentityIcon/>
                        <h2>Posts</h2>
                      </NavLink>
                      <NavLink to="/statistics" className={({isActive}) => 'link' + (isActive ? ' activeLink' : '')}>
                        <Lists/>
                        <h2>Statistics</h2>
                      </NavLink>
                    </div>
                  </Grid>
                  <Grid item xs={6} style={{margin: '20px'}}>
                    <Routes>
                      <Route exact path='/' element={<Posts/>}/>
                      <Route path='/posts' element={<Posts/>}/>
                      <Route path='/statistics' element={<Statistics/>}/>
                    </Routes>
                  </Grid>
                </Grid>
              </Router>
              }
          </PostsContext.Provider>
      </LoginContext.Provider>
  );
};

export default App;