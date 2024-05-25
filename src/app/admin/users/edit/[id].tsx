// pages/users/edit/[id].js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import AddEditUser from "../add"; // Reuse the AddUser component for edit

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query; // Get user ID from the route parameter

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/users/${id}`,
        );
        setUser(response.data);
      } catch (error) {
        setError("Error fetching user data");
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <AddEditUser
        initialUserData={user}
        submitButtonText="Update User"
        title="Update User"
        isEdit
      />
    </div>
  );
};

export default EditUser;
