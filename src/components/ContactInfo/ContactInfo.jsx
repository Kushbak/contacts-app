import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import styles from './ContactInfo.module.css'
import favIcon from '../../assets/images/favorite.svg'

const ContactFormsF = (props) => { 
    debugger
    return (
        <div className={styles.contactForms}>
            <form onSubmit={ props.handlerSubmit }>
                <div className={styles.inputBlock}>
                    <p className={styles.inputTitle}>First Name:</p>
                    <Field className={styles.contactInput} name='firstName' component='input' type='text' placeholder={ props.user.firstName } />
                </div>
                <div className={styles.inputBlock}>
                    <p className={styles.inputTitle}>Last name:</p>
                    <Field className={styles.contactInput} name='lastName' component='input' type='text' placeholder={ props.user.lastName } />
                </div>
                <div className={styles.inputBlock}>
                    <p className={styles.inputTitle}>City:</p>
                    <Field className={styles.contactInput} name='city' component='input' type='text' placeholder={ props.user.city } />
                </div>
                <div className={styles.inputBlock}>
                    <p className={styles.inputTitle}>Country:</p>
                    <Field className={styles.contactInput} name='country' component='input' type='text' placeholder={ props.user.country } />
                </div>
                <div className={styles.inputBlock}>
                    <p className={styles.inputTitle}>Phone Number:</p>
                    <Field className={styles.contactInput} name='phoneNumber' component='input' type='text' placeholder={ props.user.phoneNumber } />
                </div>
                <div className={styles.inputBlock}>
                    <p className={styles.inputTitle}>Email:</p>
                    <Field className={styles.contactInput} name='email' component='input' type='text' placeholder={ props.user.email } />
                </div>
                <div className={styles.inputBlock}>
                    <p className={styles.inputTitle}>Website:</p>
                    <Field className={styles.contactInput} name='website' component='input' type='text' placeholder={ props.user.website } />
                </div>
                <button className={ styles.saveContact } >Save Contact</button>
            </form>
        </div>
    )
}
const ContactForms = reduxForm({ form: 'contactDetails' })(ContactFormsF)

const ContactInfo = (props) => { 

    const [userId, setUserId] = useState()

    useEffect(() => { 
        setUserId(props.match.params.userId);  
    })
    return (
        <div className={ styles.contact }>
            { props.users.map(u => {
                if(u.id == userId){
                    return (
                        <div className={ styles.contactInfo }>
                            <div className={ styles.imgBlock }>
                                <img src={ u.image } alt="photo" className={ styles.photo } />
                                <img src={ favIcon } alt="fav" className={ styles.favIcon }/>
                            </div>
                            
                            <ContactForms user={ u }/>

                        </div>
                    )
                }
            }) }
        </div>
    )
}

const mstp = (state) => ({
    users: state.usersData.users
})

export default  compose( 
withRouter,
connect(mstp, {})
)(ContactInfo);