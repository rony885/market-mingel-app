import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";

import ApiReducer from "../reducer/ApiReducer";
import usePagination from "./usePagination";

const AppContext = createContext();

const initialState = {
  // loading & error
  isLoading: false,
  isError: false,

  // User / Customer module
  all_users: [],
  unpaginate_all_users: [],
  c_user: {},

  // Home module
  home: {},
  unpaginate_home: {},

  // About module
  about_us: {},
  unpaginate_about_us: {},

  // Team module
  team: [],
  unpaginate_team: [],

  // Category module
  category: [],
  unpaginate_category: [],

  // Service module
  service: [],
  unpaginate_service: [],

  // Client module
  client: [],
  unpaginate_client: [],

  // Emigrant Service Category module
  emigrantService_category: [],
  unpaginate_emigrantService_category: [],

  // Emigrant Service module
  emigrantService: [],
  unpaginate_emigrantService: [],

  // Emigrant Service Content module
  emigrantService_content: {},
  unpaginate_emigrantService_content: {},

  // Contact Module
  contact: [],
  unpaginate_contact: [],

  // businessProposal Module
  businessProposal: [],
  unpaginate_businessProposal: [],

  // Setting Module
  setting: {},
  unpaginate_setting: {},
};

const ApiContext = ({ children }) => {
  const [state, dispatch] = useReducer(ApiReducer, initialState);

  //  Use the custom hook for pagination
  const {
    handleApiPageChange,
    handleApiItemPerPageChange,
    handleApiSearchItemChange,
    handleAdditionalParamsChange,
    getUrl,
  } = usePagination();

  const resetPagination = () => {
    handleApiPageChange(1);
    handleApiSearchItemChange(null);
    handleApiItemPerPageChange(10);
  };

  // all urls
  const urls = {
    // User / Customer module
    allUsers: getUrl(
      `${process.env.REACT_APP_BASE_URL}/custom_user/all_users/`
    ),
    unpaginateAllUsers: `${process.env.REACT_APP_BASE_URL}/custom_user/all_users/`,
    currentUser: getUrl(
      `${process.env.REACT_APP_BASE_URL}/custom_user/current_user/`
    ),

    // Home module
    home: getUrl(`${process.env.REACT_APP_BASE_URL}/home_api/home/1/`),
    unpaginate_home: `${process.env.REACT_APP_BASE_URL}/home_api/unpaginate_home/1/`,

    // About module
    about_us: getUrl(`${process.env.REACT_APP_BASE_URL}/about_api/about_us/1/`),
    unpaginate_about_us: `${process.env.REACT_APP_BASE_URL}/about_api/unpaginate_about_us/1/`,

    // Team module
    team: getUrl(`${process.env.REACT_APP_BASE_URL}/about_api/team/`),
    unpaginate_team: `${process.env.REACT_APP_BASE_URL}/about_api/unpaginate_team/`,

    // Category module
    category: getUrl(
      `${process.env.REACT_APP_BASE_URL}/service_api/service_category/`
    ),
    unpaginate_category: `${process.env.REACT_APP_BASE_URL}/service_api/unpaginate_service_category/`,

    // Service module
    service: getUrl(`${process.env.REACT_APP_BASE_URL}/service_api/service/`),
    unpaginate_service: `${process.env.REACT_APP_BASE_URL}/service_api/unpaginate_service/`,

    // Client module
    client: getUrl(`${process.env.REACT_APP_BASE_URL}/client_api/client/`),
    unpaginate_client: `${process.env.REACT_APP_BASE_URL}/client_api/unpaginate_client/`,

    // Emigrant Service Category module
    emigrantService_category: getUrl(
      `${process.env.REACT_APP_BASE_URL}/emigrantService_api/emigrantService_category/`
    ),
    unpaginate_emigrantService_category: `${process.env.REACT_APP_BASE_URL}/emigrantService_api/unpaginate_emigrantService_category/`,

    // Emigrant Service module
    emigrantService: getUrl(
      `${process.env.REACT_APP_BASE_URL}/emigrantService_api/emigrantService/`
    ),
    unpaginate_emigrantService: `${process.env.REACT_APP_BASE_URL}/emigrantService_api/unpaginate_emigrantService/`,

    // Emigrant Service Content module
    emigrantService_content: getUrl(
      `${process.env.REACT_APP_BASE_URL}/emigrantService_api/emigrantService_content/1/`
    ),
    unpaginate_emigrantService_content: `${process.env.REACT_APP_BASE_URL}/emigrantService_api/unpaginate_emigrantService_content/1/`,

    // businessProposal Module
    businessProposal: getUrl(
      `${process.env.REACT_APP_BASE_URL}/businessProposal_api/businessProposal/`
    ),
    unpaginatebusinessProposal: `${process.env.REACT_APP_BASE_URL}/businessProposal_api/unpaginate_businessProposal/`,

    // Contact Module
    contact: getUrl(`${process.env.REACT_APP_BASE_URL}/contact_api/contact/`),
    unpaginateContact: `${process.env.REACT_APP_BASE_URL}/contact_api/unpaginate_contact/`,

    // Setting Module
    setting: getUrl(`${process.env.REACT_APP_BASE_URL}/setting_api/setting/1/`),
    unpaginateSetting: `${process.env.REACT_APP_BASE_URL}/setting_api/unpaginate_setting/1/`,
  };

  // Fetch data function with useCallback
  const fetchData = useCallback(async (url, actionType) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();
      dispatch({ type: actionType, payload: result });
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      dispatch({ type: "API_ERROR" });
    }
  }, []);

  // Memoize all fetch functions using useCallback
  // User / Customer module
  const fetchAllUsers = useCallback(
    () => fetchData(urls.allUsers, "SET_ALL_USERS"),
    [fetchData, urls.allUsers]
  );

  const fetchUnpaginateAllUsers = useCallback(
    () => fetchData(urls.unpaginateAllUsers, "SET_UNPAGINTE_ALL_USERS"),
    [fetchData, urls.unpaginateAllUsers]
  );

  const fetchCurrentUser = useCallback(async () => {
    const aT = localStorage.getItem("marketmingl_Access_Token");
    if (aT) {
      try {
        const response = await fetch(urls.currentUser, {
          headers: {
            Authorization: `Bearer ${aT}`,
          },
        });
        const data = await response.json();
        dispatch({ type: "SET_CURRENT_USER_API", payload: data });
      } catch (error) {
        console.error("Error fetching current user:", error);
        dispatch({ type: "API_ERROR" });
      }
    }
  }, [urls.currentUser]);

  // Fetch current user every time
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  // Home module
  const fetchHome = useCallback(
    () => fetchData(urls.home, "SET_API_HOME"),
    [fetchData, urls.home]
  );

  const fetchUnpaginateHome = useCallback(
    () => fetchData(urls.unpaginate_home, "SET_API_UNPAGINATE_HOME"),
    [fetchData, urls.unpaginate_home]
  );

  // About module
  const fetchAboutUs = useCallback(
    () => fetchData(urls.about_us, "SET_API_ABOUT_US"),
    [fetchData, urls.about_us]
  );

  const fetchUnpaginateAboutUs = useCallback(
    () => fetchData(urls.unpaginate_about_us, "SET_API_UNPAGINATE_ABOUT_US"),
    [fetchData, urls.unpaginate_about_us]
  );

  // Team module
  const fetchTeam = useCallback(
    () => fetchData(urls.team, "SET_API_TEAM"),
    [fetchData, urls.team]
  );

  const fetchUnpaginateTeam = useCallback(
    () => fetchData(urls.unpaginate_team, "SET_API_UNPAGINATE_TEAM"),
    [fetchData, urls.unpaginate_team]
  );

  // Category module
  const fetchCategory = useCallback(
    () => fetchData(urls.category, "SET_API_CATEGORY"),
    [fetchData, urls.category]
  );

  const fetchUnpaginateCategory = useCallback(
    () => fetchData(urls.unpaginate_category, "SET_API_UNPAGINATE_CATEGORY"),
    [fetchData, urls.unpaginate_category]
  );

  // Service module
  const fetchService = useCallback(
    () => fetchData(urls.service, "SET_API_SERVICE"),
    [fetchData, urls.service]
  );

  const fetchUnpaginateService = useCallback(
    () => fetchData(urls.unpaginate_service, "SET_API_UNPAGINATE_SERVICE"),
    [fetchData, urls.unpaginate_service]
  );

  // Client module
  const fetchClient = useCallback(
    () => fetchData(urls.client, "SET_API_CLIENT"),
    [fetchData, urls.client]
  );

  const fetchUnpaginateClient = useCallback(
    () => fetchData(urls.unpaginate_client, "SET_API_UNPAGINATE_CLIENT"),
    [fetchData, urls.unpaginate_client]
  );

  // Emigrant Service Category module
  const fetchEmigrantSerCategory = useCallback(
    () =>
      fetchData(urls.emigrantService_category, "SET_API_EMIGRANT_SER_CATEGORY"),
    [fetchData, urls.emigrantService_category]
  );

  const fetchUnpaginateEmigrantSerCategory = useCallback(
    () =>
      fetchData(
        urls.unpaginate_emigrantService_category,
        "SET_API_UNPAGINATE_EMIGRANT_SER_CATEGORY"
      ),
    [fetchData, urls.unpaginate_emigrantService_category]
  );

  // Emigrant Service module
  const fetchEmigrantService = useCallback(
    () => fetchData(urls.emigrantService, "SET_API_EMIGRANT_SERVICE"),
    [fetchData, urls.emigrantService]
  );

  const fetchUnpaginateEmigrantService = useCallback(
    () =>
      fetchData(
        urls.unpaginate_emigrantService,
        "SET_API_UNPAGINATE_EMIGRANT_SERVICE"
      ),
    [fetchData, urls.unpaginate_emigrantService]
  );

  // Emigrant Service Content module
  const fetchEmigrantServiceContent = useCallback(
    () =>
      fetchData(
        urls.emigrantService_content,
        "SET_API_EMIGRANT_SERVICE_CONTENT"
      ),
    [fetchData, urls.emigrantService_content]
  );

  const fetchUnpaginateEmigrantServiceContent = useCallback(
    () =>
      fetchData(
        urls.unpaginate_emigrantService_content,
        "SET_API_UNPAGINATE_EMIGRANT_SERVICE_CONTENT"
      ),
    [fetchData, urls.unpaginate_emigrantService_content]
  );

  // businessProposal Module
  const fetchBusinessProposal = useCallback(
    () => fetchData(urls.businessProposal, "SET_API_BUSINESS_PROPOSAL"),
    [fetchData, urls.businessProposal]
  );

  const fetchUnpaginateBusinessProposal = useCallback(
    () =>
      fetchData(
        urls.unpaginatebusinessProposal,
        "SET_API_UNPAGINATE_BUSINESS_PROPOSAL"
      ),
    [fetchData, urls.unpaginatebusinessProposal]
  );

  // Contact Module
  const fetchContact = useCallback(
    () => fetchData(urls.contact, "SET_API_CONTACT"),
    [fetchData, urls.contact]
  );

  const fetchUnpaginateContact = useCallback(
    () => fetchData(urls.unpaginateContact, "SET_API_UNPAGINATE_CONTACT"),
    [fetchData, urls.unpaginateContact]
  );

  // Setting Module
  const fetchSetting = useCallback(
    () => fetchData(urls.setting, "SET_API_SETTING"),
    [fetchData, urls.setting]
  );

  const fetchUnpaginateSetting = useCallback(
    () => fetchData(urls.unpaginateSetting, "SET_API_UNPAGINATE_SETTING"),
    [fetchData, urls.unpaginateSetting]
  );

  return (
    <AppContext.Provider
      value={{
        ...state,
        fetchAllUsers,
        fetchUnpaginateAllUsers,

        fetchHome,
        fetchUnpaginateHome,

        fetchAboutUs,
        fetchUnpaginateAboutUs,
        fetchTeam,
        fetchUnpaginateTeam,

        fetchCategory,
        fetchUnpaginateCategory,
        fetchService,
        fetchUnpaginateService,

        fetchClient,
        fetchUnpaginateClient,

        fetchEmigrantSerCategory,
        fetchUnpaginateEmigrantSerCategory,
        fetchEmigrantService,
        fetchUnpaginateEmigrantService,
        fetchEmigrantServiceContent,
        fetchUnpaginateEmigrantServiceContent,

        fetchBusinessProposal,
        fetchUnpaginateBusinessProposal,

        fetchContact,
        fetchUnpaginateContact,

        fetchSetting,
        fetchUnpaginateSetting,

        handleApiPageChange,
        handleApiItemPerPageChange,
        handleApiSearchItemChange,
        handleAdditionalParamsChange,
        resetPagination,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApiContext = () => useContext(AppContext);

export { ApiContext, AppContext, useApiContext };
