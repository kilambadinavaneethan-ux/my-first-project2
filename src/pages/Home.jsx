import { useContext } from "react";
import { CustomerContext } from "../context/CustomerContext";

function Home() {
  const { customers, totalCustomers, totalBalance } = useContext(CustomerContext);

  return (
    <section>
      <div className="dashboard-hero">
        <h1>Hollow Block Business Dashboard</h1>
        <p>
          Welcome to your first version of a real business app. Track customers, save balance data,
          and navigate between pages in a clean, responsive dashboard.
        </p>

        <div className="dashboard-stats">
          <div className="dashboard-stat-card">
            <span className="stat-heading">Total customers</span>
            <strong className="stat-value">{totalCustomers}</strong>
          </div>
          <div className="dashboard-stat-card">
            <span className="stat-heading">Total balance</span>
            <strong className="stat-value">${totalBalance.toFixed(2)}</strong>
          </div>
        </div>

        <div className="dashboard-features">
          <span className="feature-pill">Home Page</span>
          <span className="feature-pill">Customer Management</span>
          <span className="feature-pill">Add Customer</span>
          <span className="feature-pill">Search Customer</span>
          <span className="feature-pill">Edit Balance</span>
          <span className="feature-pill">Save Customers</span>
          <span className="feature-pill">Inventory Page</span>
          <span className="feature-pill">Expenses Page</span>
          <span className="feature-pill">Worker Page</span>
        </div>
      </div>

      <div>
        <h2 className="page-title">Start here</h2>
        <p className="page-description">
          Use the customer page to add new clients and store balances in your browser. The data
          stays saved automatically so you can refresh and continue working immediately.
        </p>
        <div className="home-customers">
          <h3>Customers</h3>
          {customers.length === 0 ? (
            <p>No customers yet. Add one on the Customers page.</p>
          ) : (
            <ul className="customer-list">
              {customers.map((c) => (
                <li key={c.id}>{c.name} — ID: {c.id}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;