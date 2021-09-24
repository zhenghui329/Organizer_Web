import React,{ useState,useEffect } from 'react';
import './App.css';
import { fetchLoginStatus } from './controller/services';
import pageType from './controller/page-types';
// import errorMessages from './controller/error-messages';
import Header from './modules/header/Header';
import SideBar from './modules/sidebar/SideBar';
import MainContent from './modules/content/MainContent';
import ModalDialog from './shared/ModalDialog';
import LoginForm from './modules/login/LoginForm';

function App() {
  const [ userState, setUserState ] = useState(null);
  const [ theme, setTheme ] = useState('colorful');
  const [ loginDialogState, setLoginDialogState ] = useState(false);
  const [ pageView, setPageView ] = useState({ reqData: null, view:pageType.INDEX });

  useEffect( () => {
    fetchLoginStatus()
    .then( responseJson => {
      setUserState({
        isLoggedIn: true,
        username: responseJson.data.username,
      });
      setTheme(responseJson.data.theme);
    })
    .catch( (err) => {
      setUserState({
        isLoggedIn: false,
        username: '',
      });
    });
  }, []);

  const login = (username) => {
    setUserState({
      isLoggedIn: true,
      username
    });
  };

  const logout = () => {
    setUserState({
      isLoggedIn: false,
      username: '',
    });
  };

  const setView = (view) => {
    setPageView(view);
  }; 

let loginDialog;
if(userState && !userState.isLoggedIn) {
  loginDialog = (
      <ModalDialog show={ loginDialogState } setShowDialog={ setLoginDialogState }>
         <LoginForm 
          onLogin={ login } 
          setDialog={ setLoginDialogState } 
          openDialog={ true } 
          setPageView={ setView }
         />
      </ModalDialog>);
}

  return (
    <div className="App">
      <Header 
        userState={ userState }
        onLogout={ logout }
        setPageView={ setView }
        setLoginDialog = { setLoginDialogState } 
      />
      <div className="main">
        <SideBar 
          userState={ userState }
          onLogin={ login }
          pageView={ pageView }
          setPageView={ setView }
          onLogout={ logout }
        />
        <div className="main-content">
          <MainContent 
            userState={ userState } 
            pageView={ pageView } 
            setPageView={ setView } 
            onLogout={ logout }
          />
        </div>
      </div>
      {loginDialog}
    </div>
  );
}

export default App;
