import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {
  const { customer } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/customers/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${customer.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
      }
      if (response.ok) {
        setProfile(data);
        setError(null);
      }
    };

    if (customer) {
      fetchProfile();
    }
  }, [customer]);

  return (
    <div style={{ color: "white " }}>
      <h2>Profile</h2>
      <div className="customer-details">
        {profile && (
          <div>
            <h3>{profile.name}</h3>
            <p>{profile.email}</p>
            <p>{profile.phone}</p>
          </div>
        )}
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Profile;
