import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountItem from "./AccountItem";
import axios from "axios";

function AllAccounts() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getAllAccounts();
  }, []);

  async function getAllAccounts() {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/users");
      console.log(response);
      setAccounts(response.data.payload);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  function searchAccounts() {
    const filteredAccounts = accounts.filter((account) =>
      `${account.firstName} ${account.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredAccounts);
  }

  return (
    <div>
      <h1 className="my-4">All Users</h1>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary"  onClick={searchAccounts}>
            <i className="bi bi-search"></i> Search
          </button>
        </div>
      </div>
      <table className="table">
        {/* <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
          </tr>
        </thead> */}
        <tbody>
          {searchTerm
            ? searchResults.map((account) => (
                <AccountItem
                  key={account.id}
                  id={account.id}
                  firstName={account.firstName}
                  lastName={account.lastName}
                  email={account.email}
                  userType={account.userType}
                />
              ))
            : accounts.map((account) => (
                <AccountItem
                  key={account.id}
                  id={account.id}
                  firstName={account.firstName}
                  lastName={account.lastName}
                  email={account.email}
                  userType={account.userType}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllAccounts;
