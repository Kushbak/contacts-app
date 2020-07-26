import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import ContactInfo from './components/ContactInfo/ContactInfo';
import Contacts from './components/Contacts/Contacts';
import { getUsers } from './redux/rootReducer';
import { Route } from 'react-router-dom';
// import { getUsers } from './api/api';
import { connect } from 'react-redux'; 

const App = React.memo((props) => {
    // let usersData = JSON.parse(localStorage.getItem('users'))
    // let [users, setUsers] = useState([])

    useEffect(() => {
        props.getUsers();
    }, [props.users[0]]) 
    return (
        <div className="App">
            <Header />
            <div className="main">
                <div className="wrapper">
                    <Route exact path='/' render={ () => <Contacts users={ props.users }/> } />
                    <Route path='/contact/:userId' render={ () => <ContactInfo /> } /> 
                </div>
            </div>
        </div>
  );
})

const mstp = (state) => ({
    users: state.usersData.users
})



export default connect(mstp, { getUsers })(App);
