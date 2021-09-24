import React,{ useState } from 'react';
import pageType from '../../controller/page-types';
import CreateButtonSide from '../../shared/CreateButtonSide';
import MyPageButton from '../../shared/MyPageButton';
import ModalDialog from '../../shared/ModalDialog';
import NewCategoryForm from '../to-add/NewCategoryForm';
import NewListForm from '../to-add/NewListForm';


const UserSideMenu = ({ userState, setPageView, onLogout }) => {
	
	const [ newCatState, setNewCatState] = useState(false);
  	const [ newListState, setNewListState] = useState(false);

	let newCatDialog;
	let newListDialog;
	if(newCatState) {
	  newCatDialog = (<ModalDialog show={ newCatState } setShowDialog={ setNewCatState }>
	         <NewCategoryForm 
	          userState={ userState } 
	          setDialog={ setNewCatState }
	          setPageView={ setPageView }
	          onLogout={ onLogout }
	          />
	      </ModalDialog>);
	}
	if(newListState){
	  newListDialog = (<ModalDialog show={ newListState } setShowDialog={ setNewListState }>
	         <NewListForm 
	          userState={ userState } 
	          setDialog={ setNewListState } 
	          setPageView={ setPageView }
	          onLogout={ onLogout }
	          />
	      </ModalDialog>);
	}

	const goToPost = () => {
		setPageView({ reqData:null, view:pageType.POST_ITEM });
  	};

	return(
		<div className="sidebar-module-top">
			<CreateButtonSide text="New Category" onClick={ () => setNewCatState(true) } />
			<CreateButtonSide text="New List" onClick={ () => setNewListState(true) } />
			<CreateButtonSide text="New Item" onClick={ goToPost } />
			<MyPageButton
				userState={ userState }  
				setPageView={ setPageView }  
			>My Page</MyPageButton>
			{newCatDialog}
      		{newListDialog}
		</div>
	);
};

export default UserSideMenu;