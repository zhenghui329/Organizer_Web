const sort = {

  sortBy : ({ array, sortby, ascend = false }) => {
    if(Array.isArray(array)){
      switch (sortby) {
        case 'categoryName':
        case 'listName':
        case 'itemName':
        case 'maker':
            if(ascend) {
              return array.sort( (a, b) => (a[sortby].toLowerCase()).localeCompare(b[sortby].toLowerCase()) );
            } else {
              return array.sort( (a, b) => (b[sortby].toLowerCase()).localeCompare(a[sortby].toLowerCase()) );        
            }
        case 'updated':
        case 'created':
        case 'listCount':
        case 'itemCount':
        case 'releaseDate':
        case 'collectedDate':
        case 'rate':
        case 'price':
          if(ascend) {
            return array.sort( (a, b) => a[sortby] - b[sortby] );
          } else {
            return array.sort( (a, b) => b[sortby] - a[sortby] );        
          }
        default:
          return array;
      }
    }
    return;
  },

}

export default sort;