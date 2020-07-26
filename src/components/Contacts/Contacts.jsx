import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Contacts.module.css';
import favIcon from '../../assets/images/favorite.svg'
import nonfavIcon from '../../assets/images/nonfavorite.svg'
import emailIcon from '../../assets/images/email.svg'
import internetIcon from '../../assets/images/internet.svg'
import locationIcon from '../../assets/images/location.svg'
import smartphoneIcon from '../../assets/images/smartphone.svg'
import { connect } from 'react-redux';

const usersMapping = (users) => {
    return users.map(u => (
        <div className={ styles.contactItem } key={ u.id } >
            <div className={ styles.photo }><img src={ u.image } alt="image" /></div>
            <div className={ styles.textInfo }>
                <p className={ styles.name }>
                    { u.firstName } { u.lastName }
                    <span className={ styles.favorite }><img src={ nonfavIcon || favIcon } alt="favorite" /></span>
                </p>
                <p className={ styles.location }>
                    <img className={ styles.icon } src={ locationIcon } alt="icon" />
                    { u.city } city, { u.country }
                </p>
                <p className={ styles.number }>
                    <img className={ styles.icon } src={ smartphoneIcon } alt="icon" />
                    { u.phoneNumber }
                </p>
                <p className={ styles.website }>
                    <img className={ styles.icon } src={ internetIcon } alt="icon" />
                    { u.website }
                </p>
                <p className={ styles.email }>
                    <img className={ styles.icon } src={ emailIcon } alt="icon" />
                    { u.email }
                </p>
                <div className={ styles.btnBlock }>
                    <NavLink to={`/contact/${ u.id }`} className={ styles.showUser }>Show</NavLink>
                </div>
            </div>
        </div>
    )) 
}

const Contacts = (props) => {
    const [searchedUsers, setSearchedUsers] = useState();

    const searchFunc = (e) => {
        setSearchedUsers(props.users.filter(item => {
            return item.firstName.toLowerCase().search(e.target.value.toLowerCase()) != -1 
            || item.lastName.toLowerCase().search(e.target.value.toLowerCase()) != -1
        }))
    } 

    const azSort = (users) => {
        return users.sort((a, b) => a.firstName - b.firstName)
    }
    
    const zaSort = (users) => {
        users.sort((a, b) => b.firstName - a.firstName)
    }

    return (
        <div className={ styles.contactsBlock }> 

            <div className={ styles.actionBars }>
                <div className={ styles.search }>
                    <input type="text" className={ styles.searchInput } onChange={ (e) => searchFunc(e) } placeholder='type to search...' />
                </div>
                <div className={ styles.actionButtons }>
                    Favorite
                    <button onClick={ () => azSort(props.users) }> AZ </button>
                    <button onClick={ () => zaSort(props.users) }> ZA </button>
                </div>
            </div>

            <div className={ styles.contacts }>
                { searchedUsers 
                    ? usersMapping(searchedUsers)
                    : usersMapping(props.users)
                }
            </div> 
        </div>
    )
}

const mstp = (state) => ({
    users: state.usersData.users
})

export default connect(mstp, {})(Contacts);