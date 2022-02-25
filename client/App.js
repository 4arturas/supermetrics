import './App.css'

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Lists from "@mui/icons-material/ListAlt";

import {BrowserRouter as Router, Link, NavLink, Route, Routes} from 'react-router-dom'
import {Grid} from "@mui/material";

import Consents from "./components/consents/consents";
import GiveConsent from "./components/give-consent/give-consent";

const App = () => {
    return (
        <Router>
            <Grid container justifyContent="center">
                <Grid item xs={2}>
                    <div className="sidebar">
                        <NavLink to="/give-consent" className={({isActive}) => 'link' + (isActive ?' activeLink' : '')}>
                            <PermIdentityIcon/>
                            <h2>Give consent</h2>
                        </NavLink>
                        <NavLink to="/consents" className={({isActive}) => 'link' + (isActive ?' activeLink' : '')}>
                            <Lists/>
                            <h2>Consents</h2>
                        </NavLink>
                    </div>
                </Grid>
                <Grid item xs={6} style={{margin: '20px'}}>
                    <Routes>
                        <Route exact path='/' element={<GiveConsent />} />
                        <Route path='/give-consent' element={<GiveConsent />} />
                        <Route path='/consents' element={<Consents />}  />
                    </Routes>
                </Grid>
            </Grid>
        </Router>
    );
};

export default App;