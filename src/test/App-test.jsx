import React,{ useState,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchAllLists,fetchSingleCat, fetchCategories,addCategory, 
  updateCategory, deleteCategory, deleteALLCategory, fetchListsOfOneCat, fetchSingleList,fetchListsBy,
  addList,updateSingleList,deleteSingleList, fetchItemsFromList, fetchSingleItem,
  addItem, updateItem, deleteItem } from './services';
import errorMessages from './error-messages';

function App() {
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [ content, setContent] = useState('');
  const [item, setItem] = useState(null);

  useEffect(()=>{

    // fetchAllLists()
    // .then( responseJson => {
    //       setData(responseJson.data);
    //     })
    // .catch( (err) => {
    //   setError(errorMessages[err.code || 'DEFAULT']);
    // });

    const newCat = {
      categoryName:'CD2', 
      username: 'Mike',
    };
    addCategory({ username: 'Mike', category: newCat});

    // deleteCategory({ username: 'Mike', categoryId:'8b6077ab-05f2-4129-bb3e-14a9782c425a', complete: false});
    // deleteALLCategory({username:'Zhenghui', complete: false});

    // fetchListsBy({username: 'Zhenghui', categoryId:'28a77728-4bc5-4c59-9d15-b0d145239488' })
    // .then( responseJson => {
    //   setData(responseJson.data);
    // });

    fetchCategories('Zhenghui')
    .then( responseJson => {
      setContent(responseJson.data);
    });

    fetchSingleList('3403fc31-1a46-449c-ae1e-eaf681b488bc')
    .then( responseJson => {
      console.log(responseJson.data);
    });

    const newList = {
      listName: 'Classic CD',
      categoryId: '8b6077ab-05f2-4129-bb3e-14a9782c425a',
      username: 'Mike',
    }
    addList({username: 'Mike', list:newList });
    const updateList = {
      listName: 'Movie Song CD2',
      categoryId: '8b6077ab-05f2-4129-bb3e-14a9782c425a',
      username: 'Mike',
    }
    updateSingleList({username:'Mike', listId: '3403fc31-1a46-449c-ae1e-eaf681b488bc', list: updateList });

    // deleteSingleList({username:'Mike', listId: '3403fc31-1a46-449c-ae1e-eaf681b488bc' });

    fetchAllLists()
    .then( responseJson => {
          setData(responseJson.data);
        })
    .catch( (err) => {
      setError(errorMessages[err.code || 'DEFAULT']);
    });

    // fetchSingleCat('8b6077ab-05f2-4129-bb3e-14a9782c425a')
    // .then( responseJson => {
    //   setContent(responseJson.data.categoryName);
    // });


    // fetchSingleItem('b369add8-0773-4feb-9bcd-a84a3b96b660')
    // .then( responseJson => {
    //       setItem(responseJson.data);
    //     })
    // .catch( (err) => {
    //   setError(errorMessages[err.code || 'DEFAULT']);
    // });

    const newItem = {
      itemName: 'music stamp',
      listId: '53897053-d442-4180-9a66-c324f911170e',
      description: 'new added item!!!!!',
      updateTime: Date.now(),
    };

    addItem({ username:'Zhenghui', item:newItem });

    const replaceItem = {
      itemId:'c828d462-46a2-4c86-bdc9-d5a76c80a612',
      itemName: 'dealine stamp22222',
      listId: '53897053-d442-4180-9a66-c324f911170e',
      description: 'update the item!!!!!',
      updateTime: Date.now(),
    };

    updateItem({ username:'Zhenghui', itemId:'c828d462-46a2-4c86-bdc9-d5a76c80a612', item:replaceItem });

    deleteItem({ username:'Zhenghui', itemId:'4f360585-e7c6-46a3-8096-fc8c84f1a4b1' });

    fetchItemsFromList('53897053-d442-4180-9a66-c324f911170e')
    .then( responseJson => {
          setItem(responseJson.data);
        })
    .catch( (err) => {
      setError(errorMessages[err.code || 'DEFAULT']);
    });

    // fetchSingleItem('b369add8-0773-4feb-9bcd-a84a3b96b660')
    // .then( responseJson => {
    //       setItem(responseJson.data);
    //     })
    // .catch( (err) => {
    //   setError(errorMessages[err.code || 'DEFAULT']);
    // });


  },[]);

let datalist;
let show;
let items;
if(data){
  // console.log(JSON.stringify(data));
  datalist = Object.values(data).map( (list) => {
    return <li>
      <div>listId:{list.listId}</div>
      <div>listName: {list.listName}</div>
      <div>categoryId: {list.categoryId}</div>
      <div>username: {list.username}</div>
      <div>updateTime: {list.updateTime}</div>
    </li>
  });

    if(content){
      show = content.map( cat => {
        return <li>
          <span>catName:{cat.categoryName}</span>
        </li>
      });
      // show = content;
    }
}else{
  datalist='something wrong';
}

if(item){

// display single item
  // items = (<li>
  //      <div>itemId:{item.itemId}</div>
  //      <div>itemName: {item.itemName}</div>
  //      <div>listId: {item.listId}</div>
  //      <div>description: {item.description}</div>
  //    </li>);

// display group items
  items = item.map( (item) => {
    return <li>
      <div>itemId:{item.itemId}</div>
      <div>itemName: {item.itemName}</div>
      <div>listId: {item.listId}</div>
      <div>description: {item.description}</div>
      <div>updateTime: {item.updateTime}</div>
    </li>
  });

}



  return (
    <div className="App">
      {error}
      <div>
        <p>fetch all list</p>
        <ul>{datalist}</ul>
        <p>TEST:</p>
        <ul>{show} </ul>
        <p>Item</p>
        <ul>{items}</ul>
      </div>
      
    </div>
  );
}

export default App;
