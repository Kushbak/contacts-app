import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Contacts.module.css';
import favIcon from '../../assets/images/favorite.svg';
import nonfavIcon from '../../assets/images/nonfavorite.svg';
import emailIcon from '../../assets/images/email.svg';
import internetIcon from '../../assets/images/internet.svg';
import locationIcon from '../../assets/images/location.svg';
import smartphoneIcon from '../../assets/images/smartphone.svg';
import { addToFavorites, removeFavorite, setFavoritesFromLS } from '../../redux/rootReducer';


const Contacts = ({ users, favorites, setFavoritesFromLS, addToFavorites, removeFavorite  }) => {
    const [searchedUsers, setSearchedUsers] = useState();
    const [isFavoritesFilter, setFavoritesFilter] = useState(false);  

    const preventFavorites = useRef();
    preventFavorites.current = favorites;
    
    useEffect(() => { 
        if(!favorites.length && JSON.parse(localStorage.getItem('favorites')).length){
            setFavoritesFromLS(JSON.parse(localStorage.getItem('favorites')))
        } 
    }, [])

 
    
    const setFavorites = async (user) => {   
        if (!favorites.some(item => item.id === user.id)) {
            await addToFavorites(user)  
        } else {
            await removeFavorite(user)  
        }     
        localStorage.setItem('favorites', JSON.stringify(preventFavorites.current));
    }  

    const searchFunc = (e) => {
        setSearchedUsers(users.filter(item => {
            return item.firstName.toLowerCase().search(e.target.value.toLowerCase()) !== -1
                || item.lastName.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        }))
    }

    const sortFunc = (users, direction) => {  
        [].slice.call(users).sort((a, b) => {  
            return a > b ? direction : direction * -1;
        }); 
    }

    return (
        <div className={ styles.contactsBlock }>

            <div className={ styles.actionBars }>
                <div className={ styles.search }>
                    <input type="text" className={ styles.searchInput } onChange={(e) => searchFunc(e)} placeholder='type to search...' />
                </div>
                <div className={ styles.actionButtons}>
                    <span className= {styles.favoritesFilter } onClick={ () => setFavoritesFilter(!isFavoritesFilter) } ><img src={ isFavoritesFilter ? favIcon : nonfavIcon } alt="Favorites" /></span>
                    <button onClick={ () => sortFunc(users, 1) } className={ styles.sortBtn } > AZ </button>
                    <button onClick={ () => sortFunc(users, -1) } className={ styles.sortBtn } > ZA </button>
                </div>
            </div>

            <div className={ styles.contacts}>
                {searchedUsers
                    ? <UsersMapping users={ searchedUsers } setFavorites={ setFavorites } isFavorites={ isFavoritesFilter } favorites={ favorites } />
                    : <UsersMapping users={ users } setFavorites={ setFavorites } isFavorites={ isFavoritesFilter } favorites={ favorites } />
                }
            </div>
        </div>
    )
}

const UsersMapping = ({ users, setFavorites, isFavorites, favorites }) => {  
    let forMapping = isFavorites ? favorites : users  
    return forMapping.map(u => (
        <div className={ styles.contactItem } key={ u.id } >
            <div className={ styles.photo }><img src={ u.image } alt="profile" /></div>
            <div className={ styles.textInfo }>
                <p className={ styles.name }>
                    { u.firstName } { u.lastName }
                    <span className={ styles.favorite } onClick={ () => setFavorites(u) } >
                        <img src={ (favorites.length && favorites.some(item => item.id === u.id)) ? favIcon : nonfavIcon} alt="favorite" />
                    </span>
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
                    <NavLink to={`/contact/${u.id}`} className={ styles.showUser }>Show</NavLink>
                </div>
            </div>
        </div>
    ))
}


const mstp = (state) => ({
    users: state.usersData.users,
    favorites: state.usersData.favorites
})

export default connect(mstp, { addToFavorites, removeFavorite, setFavoritesFromLS })(Contacts);