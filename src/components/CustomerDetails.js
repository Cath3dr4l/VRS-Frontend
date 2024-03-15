import { useCustomersContext } from "../hooks/useCustomersContext";

const CustomerDetails = ({ customer }) => {
  const { dispatch } = useCustomersContext();

  const handleClick = async () => {
    const response = await fetch(`/api/customers/${customer._id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Customer deleted successfully!");
      dispatch({ type: "DELETE_CUSTOMER", payload: data });
    }
  };

  return (
    <div className="customer-details">
      <h4>{customer.username}</h4>
      {/* <h4>{customer.name}</h4> */}
      <span onClick={handleClick}>Delete</span>
    </div>
  );
};

export default CustomerDetails;
