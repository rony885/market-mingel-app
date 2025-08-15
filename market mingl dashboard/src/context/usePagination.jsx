import { useState } from "react";
const usePagination = () => {
  const [page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [searchItem, setSearchItem] = useState(null);

  // New state for additional query parameters (if needed)
  const [additionalParams, setAdditionalParams] = useState({});

  // Handling page change
  const handleApiPageChange = (value) => {
    setPage(value);
  };

  // Handling number of items per page
  const handleApiItemPerPageChange = (value) => {
    setItemPerPage(value);
  };

  // Handling search input changes
  const handleApiSearchItemChange = (value) => {
    setSearchItem(value);
  };

  // Handling the change of additional parameters dynamically
  const handleAdditionalParamsChange = (newParams) => {
    setAdditionalParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  // Building the URL with query parameters dynamically
  const getUrl = (mainUrl) => {
    const searchParams = new URLSearchParams({
      p: page,
      items_per_page: itemPerPage,
      search: searchItem || null, // Search term
      ...additionalParams, // Spread any additional query params here
    });
    return `${mainUrl}?${searchParams.toString()}`;
  };

  return {
    page,
    itemPerPage,
    searchItem,
    handleApiPageChange,
    handleApiItemPerPageChange,
    handleApiSearchItemChange,
    handleAdditionalParamsChange, // Expose this to change additional parameters
    getUrl,
  };
};
export default usePagination;
