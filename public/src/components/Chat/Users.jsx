/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import './Users.css'

const Users = (props)=>{
const { users, currentUser, changeChat } = props;

// const [currentUserFullName, setCurrentUserFullName] = useState('')
const [currentUserName, setCurrentUserName] = useState('')
const [currentSelected, setCurrentSelected] = useState('')

useEffect(()=>{

    setCurrentUserName(currentUser.username)
    // console.log('// ', currentUserName)

},[currentUser])

const changeCurrentChat = (index, user) => {
  setCurrentSelected(index);
  changeChat(user);
};

  return (
    <>
      {
          currentUserName &&(
          <div className='user-container'>
              <div className='websiteLogo'>Chat.io</div>
              <div className='allUsers'>
              {
                users.map((user, index)=>{
                  return(
                    <div 
                      className={`users ${index===currentSelected?"selected":""}`}
                      key={index}
                      onClick={() => {changeCurrentChat(index, user)}}>
                        <h3>{user.fullname}</h3>
                        <h5>{user.username}</h5>
                    </div>
                  )
                })
              }
              </div>
          </div>
        )
      }
      Chats
    </>
  )
}

// Users.propTypes = {
//   users: PropTypes.array.isRequired,
//   currentUser: PropTypes.object.isRequired,
//   // changeChat: PropTypes.string.isRequired,
// };

export default Users