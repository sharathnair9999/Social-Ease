import React, { useCallback, useRef, useState } from "react";
import { useOnClickOutside } from "../custom-hooks";
import { debounce, handleChange } from "../helpers";
import { searchUsers } from "../services";
import PersonCard from "./PersonCard";

const Searchbar = () => {
  const [input, setInput] = useState({ searchTerm: "" });
  const searchResultRef = useRef();
  const [usersList, setUsersList] = useState({
    data: [],
    fetchStatus: "NOT_FETCHING",
  });
  useOnClickOutside(searchResultRef, () =>
    setUsersList((state) => ({
      ...state,
      fetchStatus: "NOT_FETCHING",
      data: [],
    }))
  );

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const debounceSearch = useCallback(
    debounce((currValue) => searchUsers(currValue, setUsersList), 1000),
    []
  );

  return (
    <div className="relative lg:mr-auto lg:ml-56 px-2 w-full">
      <form className="w-full lg:max-w-md md:max-w-md" onSubmit={handleSearch}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            value={input.searchTerm}
            onChange={(e) => {
              handleChange(e, setInput);
              e.target.value.length > 1 && debounceSearch(e.target.value);
            }}
            name="searchTerm"
            id="default-search"
            className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none  "
            placeholder="Search by username"
            required
          />
        </div>
      </form>

      <div
        ref={searchResultRef}
        className={`absolute top-full w-full max-h-56 min-h-[5rem] ${
          input.searchTerm.length > 0 && usersList.data.length > 0
            ? "visible"
            : "hidden"
        } overflow-y-auto bg-slate-50 max-w-md px-2 py-4 rounded-md shadow-md flex justify-start items-start flex-col gap-4`}
      >
        {usersList.fetchStatus === "FETCHED" && usersList.data.length > 0
          ? usersList.data.map((user) => (
              <div
                className="w-full"
                key={user.uid}
                onClick={() => {
                  setUsersList((state) => ({
                    ...state,
                    fetchStatus: "NOT_FETCHING",
                    data: [],
                  }));
                  setInput({ searchTerm: "" });
                }}
              >
                <PersonCard user={user} />
              </div>
            ))
          : "No Users Found"}
      </div>
    </div>
  );
};

export default Searchbar;
