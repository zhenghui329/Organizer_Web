const auth = {
  isPermittedUsername: (username) => {
    // this would also be where a password would be checked
    if(!username) {
      return false;
    }
    if(username.toLowerCase() === 'dog') {
      return false;
    }
    // whitelist allowed characters and length
    if(!username.match(/^[A-Za-z0-9_-]{2,20}$/)) {
      return false;
    }
    return true;
  },
  // category names allow space
  isPermittedCatName: (categoryName) => {
    if(!categoryName || !categoryName.match(/^[' 'A-Za-z0-9_-]{2,20}$/)) {
      return false;
    }
    return true;
  },
  // list names and item names allow more letters
  isPermittedTitle: (title) => {
    if(!title || title.length < 2 || title.length > 100) {
      return false;
    }
    return true;
  },
  isPermittedLength: ({ input, max }) => {
    if(input.length > max) {
      return false;
    }
    return true;
  },
  isPermittedCatCount: (count) => {
    if(count > 10){
      return false;
    } 
    return true;
  },
  isValidImgSize:(base64String)=> {
    // This function counts the header part 'data:image/jpeg;base64'
    const sizeInBytes = 4 * Math.ceil((base64String.length / 3))*0.5624896334383812;
    const sizeInKb = sizeInBytes / 1024;
    if(sizeInKb > 5 * 1024) {
      return false;
    }
    return true;
  },
  process: (input) => {
    if(input){
      return input.trim().replace(/\s\s+/g, ' ');
    }
    return;
  },
};

module.exports = auth;
