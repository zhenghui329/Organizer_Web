const errorMessages = {
  DEFAULT: `Oh no!  Something went wrong, please try again`,
  NETWORK_ERROR: `There was a problem reaching your network, please try again`,
  NO_VALID_SESSION: `You must be logged in to view this content. Please log in or refresh the page.`,

  USERNAME_REQUIRED: `Username is required`,
  USERNAME_DENIED: `You can't use invalid character in username. Only numbers, letters, hyphen and underscore are allowed. Length should be 2-20`,
  
  USER_UNAUTHORIZED: `You are not permitted to view this content. Please refresh the page.`,
  ACTION_NOT_PERMITTED: `You are not permitted to perform this action. Please refresh the page.`,
  
  DUPLICATE_CAT_NAME: `Category already exists. Please change another name`,
  DUPLICATE_LIST_NAME: `List in this category already exists. Please change another name`,
  DUPLICATE_ITEM_NAME: `Item in this list already exists. Please change another name`,

  CAT_NAME_DENIED:`You can't use invalid character in category name. Only numbers, letters, hyphen and underscore are allowed. Length should be 2-20`,
  LIST_NAME_DENIED:`The length of list name should between 2-100`,
  ITEM_NAME_DENIED:`The length of item name should between 2-100`,

  NO_SUCH_ITEM: `The item does not exist. Please refresh the page`,
  NO_SUCH_CAT: `The category does not exist. Please refresh the page.`,
  NO_SUCH_LIST: `The list does not exist. Please refresh the page or try other operations.`,

  FAILED_TO_DELETE_CAT: `failed to delete a category`,
  ATTEMPT_TO_DELETE_DEFAULT:`You can't delete the default category`,
  FORBIDDEN:`forbidden action`,

  INPUT_REQUIRED: `You must complete the required field`,
  NO_LIST_IN_CAT:`There is no list in this category. Add a new list or change another category`,
  TOO_MUCH_INPUT: `You can only add 2000 letters in the description`,
  TOO_MUCH_INPUT_LIST:`You can only add 500 letters in the description`,
  LARGER_THAN_5: `You can't upload images larger than 5M`,

  CLEAR:'',
};

export default errorMessages;
