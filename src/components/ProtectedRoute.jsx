function ProtectedRoute({ user, children }) {
  if (!user) {
    return (
      <section className="protected-page">
        <div className="page-header">
          <h1>Please login</h1>
          <p>Only logged-in users can access this page. Use the login page to continue.</p>
        </div>
      </section>
    );
  }

  return children;
}

export default ProtectedRoute;
