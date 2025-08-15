const ApiReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    // User / Customer module
    case "SET_ALL_USERS":
      return {
        ...state,
        isLoading: false,
        all_users: action.payload,
        isError: false,
      };

    case "SET_UNPAGINATE_ALL_USERS":
      return {
        ...state,
        isLoading: false,
        unpaginate_all_users: action.payload,
        isError: false,
      };

    case "SET_CURRENT_USER_API":
      return {
        ...state,
        isLoading: false,
        c_user: action.payload,
        isError: false,
      };

    // Home module
    case "SET_API_HOME":
      return {
        ...state,
        isLoading: false,
        home: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_HOME":
      return {
        ...state,
        isLoading: false,
        unpaginate_home: action.payload,
        isError: false,
      };

    // About module
    case "SET_API_ABOUT_US":
      return {
        ...state,
        isLoading: false,
        about_us: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_ABOUT_US":
      return {
        ...state,
        isLoading: false,
        unpaginate_about_us: action.payload,
        isError: false,
      };

    // Team module
    case "SET_API_TEAM":
      return {
        ...state,
        isLoading: false,
        team: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_TEAM":
      return {
        ...state,
        isLoading: false,
        unpaginate_team: action.payload,
        isError: false,
      };

    // Category module
    case "SET_API_CATEGORY":
      return {
        ...state,
        isLoading: false,
        category: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_CATEGORY":
      return {
        ...state,
        isLoading: false,
        unpaginate_category: action.payload,
        isError: false,
      };

    // Service module
    case "SET_API_SERVICE":
      return {
        ...state,
        isLoading: false,
        service: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_SERVICE":
      return {
        ...state,
        isLoading: false,
        unpaginate_service: action.payload,
        isError: false,
      };

    // Client module
    case "SET_API_CLIENT":
      return {
        ...state,
        isLoading: false,
        client: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_CLIENT":
      return {
        ...state,
        isLoading: false,
        unpaginate_client: action.payload,
        isError: false,
      };

    // Emigrant Service Category module
    case "SET_API_EMIGRANT_SER_CATEGORY":
      return {
        ...state,
        isLoading: false,
        emigrantService_category: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_EMIGRANT_SER_CATEGORY":
      return {
        ...state,
        isLoading: false,
        unpaginate_emigrantService_category: action.payload,
        isError: false,
      };

    // Emigrant Service module
    case "SET_API_EMIGRANT_SERVICE":
      return {
        ...state,
        isLoading: false,
        emigrantService: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_EMIGRANT_SERVICE":
      return {
        ...state,
        isLoading: false,
        unpaginate_emigrantService: action.payload,
        isError: false,
      };

    // Emigrant Service Content module
    case "SET_API_EMIGRANT_SERVICE_CONTENT":
      return {
        ...state,
        isLoading: false,
        emigrantService_content: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_EMIGRANT_SERVICE_CONTENT":
      return {
        ...state,
        isLoading: false,
        unpaginate_emigrantService_content: action.payload,
        isError: false,
      };

    //BUSINESS_PROPOSAL Module
    case "SET_API_BUSINESS_PROPOSAL":
      return {
        ...state,
        isLoading: false,
        businessProposal: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_BUSINESS_PROPOSAL":
      return {
        ...state,
        isLoading: false,
        unpaginate_businessProposal: action.payload,
        isError: false,
      };

    //Contact Module
    case "SET_API_CONTACT":
      return {
        ...state,
        isLoading: false,
        contact: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_CONTACT":
      return {
        ...state,
        isLoading: false,
        unpaginate_contact: action.payload,
        isError: false,
      };

    //Setting Module
    case "SET_API_SETTING":
      return {
        ...state,
        isLoading: false,
        setting: action.payload,
        isError: false,
      };

    case "SET_API_UNPAGINATE_SETTING":
      return {
        ...state,
        isLoading: false,
        unpaginate_setting: action.payload,
        isError: false,
      };

    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};

export default ApiReducer;
