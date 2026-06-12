function CustomerCard({ customer, onUpdateBalance, onDelete }) {
  return (
    <tr className="customer-row">
      <td className="name-cell">{customer.name}</td>
      <td className="balance-cell">
        <input
          type="number"
          value={customer.balance}
          onChange={(e) => onUpdateBalance(customer.id, e.target.value)}
          className="balance-input"
          step="0.01"
        />
      </td>
      <td className="date-cell">{customer.createdAt}</td>
      <td className="actions-cell">
        <button
          onClick={() => onDelete(customer.id)}
          className="btn-delete"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default CustomerCard;
