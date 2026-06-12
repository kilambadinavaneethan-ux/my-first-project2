import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Customers.css";
import { CustomerContext } from "../context/CustomerContext";

function Customers() {
  const navigate = useNavigate();
  const {
    customers,
    totalCustomers,
    totalBalance,
    addCustomer,
    updateCustomerBalance,
    deleteCustomer,
    clearAllCustomers,
  } = useContext(CustomerContext);
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [saveStatus, setSaveStatus] = useState("✅ Ready to save");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (customers.length > 0) {
      setSaveStatus("✅ Customers loaded");
      const timeoutId = setTimeout(() => setSaveStatus("✅ Ready to save"), 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [customers]);

  // Add new customer
  const handleAddCustomer = async (e) => {
    e.preventDefault();

    if (!name.trim() || !balance.trim()) {
      alert("Please fill in both name and balance");
      return;
    }

    const balanceNum = parseFloat(balance);
    if (isNaN(balanceNum)) {
      alert("Balance must be a number");
      return;
    }

    const newCustomer = {
      name: name.trim(),
      balance: balanceNum,
      createdAt: new Date().toLocaleString(),
    };

    setIsSaving(true);
    setSaveStatus("⏳ Saving to Firestore...");
    const success = await addCustomer(newCustomer);
    if (success) {
      setSaveStatus("✅ Saved to Firestore");
    } else {
      setSaveStatus("⚠️ Failed to save to Firestore — saved locally");
    }
    setName("");
    setBalance("");
    setIsSaving(false);
    setTimeout(() => setSaveStatus("✅ Ready to save"), 2000);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  // Update customer balance
  const handleUpdateBalance = (id, newBalance) => {
    const balanceNum = parseFloat(newBalance);
    if (isNaN(balanceNum)) {
      alert("Balance must be a number");
      return;
    }

    updateCustomerBalance(id, balanceNum);
  };

  // Delete a customer
  const handleDeleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deleteCustomer(id);
    }
  };

  // Clear all customers
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all customers? This cannot be undone!")) {
      clearAllCustomers();
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customer-manager">
      <div className="manager-container">
        <div className="page-header-row">
          <h1>💰 Customer Balance Manager Pro</h1>
          <button type="button" className="btn-home-redirect" onClick={handleGoHome}>
            ← Back to Home
          </button>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <form onSubmit={handleAddCustomer}>
            <div className="form-group">
              <label htmlFor="name">Customer Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter customer name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="balance">Balance Amount</label>
              <input
                id="balance"
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="Enter balance"
                step="0.01"
                required
              />
            </div>

            <button type="submit" className="btn-add" disabled={isSaving}>
              {isSaving ? "Saving..." : "➕ Add Customer"}
            </button>
          </form>
        </div>

        {/* Search Section */}
        <div className="form-section search-section">
          <div className="form-group">
            <label htmlFor="search">Search Customers</label>
            <input
              id="search"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type a customer name to search"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-card">
            <span className="stat-label">Total Customers</span>
            <span className="stat-value">{totalCustomers}</span>
          </div>
          <div className="stat-card total">
            <span className="stat-label">Total Balance</span>
            <span className="stat-value">${totalBalance.toFixed(2)}</span>
          </div>
          <button onClick={handleClearAll} className="btn-clear-all">
            🗑️ Clear All
          </button>
        </div>

        {/* Customers List */}
        <div className="customers-list">
          {customers.length === 0 ? (
            <div className="empty-state">
              <p>No customers yet. Add one to get started! 👇</p>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="empty-state">
              <p>No matching customers found for "{searchTerm}".</p>
            </div>
          ) : (
            <table className="customers-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Balance</th>
                  <th>Added On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="name-cell">{customer.name}</td>
                    <td>
                      <input
                        type="number"
                        value={customer.balance}
                        onChange={(e) =>
                          handleUpdateBalance(customer.id, e.target.value)
                        }
                        className="balance-input"
                        step="0.01"
                      />
                    </td>
                    <td className="date-cell">{customer.createdAt}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Auto Save Indicator */}
        <div className="auto-save-indicator">
          {saveStatus}
        </div>
      </div>
    </div>
  );
}

export default Customers;