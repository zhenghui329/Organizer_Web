import React, { useState } from 'react';
import { fetchLogin, addCategory,addList } from '../../controller/services';
import errorMessages from '../../controller/error-messages';
import pageType from '../../controller/page-types';
import LoginButton from '../../shared/LoginButton';

const LoginForm = ({ onLogin, openDialog, setDialog, setPageView }) => {

  const [ username, setUsername ] = useState('');
  const [ error, setError ] = useState('');

  const addDefault = (username) => {
    return addCategory({ username, category: { categoryName: 'default' }})
          .then( (responseJson) => {
            const categoryId = responseJson.data.categoryId;
            return addList({ username, list:{ listName:'Default', description:'', categoryId } });
          })
          .catch( () => {
            // if default category and default list already exist, it's ok
            // this step should happen in sign up stage that is omitted in this app
          });
  };

  const goToMyPage = () => {
    setPageView({ reqData:{username}, view:pageType.USER_SELF });
  }

  const performLogin = () => {
    if(!username) {
      setError(errorMessages.USERNAME_REQUIRED);
      return;
    }
    setError('');
    fetchLogin(username)
    .then( () => {
      addDefault(username)
      .then( () => {
        if(openDialog){
          setDialog(false);
        }
        goToMyPage();
        setError('');
        onLogin(username);
      });
    })
    .catch( (err) => {
      setError(errorMessages[err.code || 'DEFAULT']);
      setUsername('');
    });
  };


  return (
      <div className="login-form">
        <div className="dialog-title">Log In</div>
        <p className="dialog-prompt">log in to view more and create your own collections</p>
        <p className="error">{ error }</p>
        <div>
          <label>username: </label>
          <div className="login-input-group">
            <div className="log-in-icon-block">
              <i className="material-icons log-in-icon">person</i>
            </div>
            <input className="login-input" value={username} 
            onChange={ (e) => setUsername(e.target.value.trim()) } />
          </div>
          <LoginButton text="Log in" onClick={ performLogin } />
        </div>
      </div>
  );

};

export default LoginForm;
