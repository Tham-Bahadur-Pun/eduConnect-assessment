import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { userService } from "../../services/userServices";
import { LuArrowLeft, LuBuilding } from "react-icons/lu";
import { FaUserEdit } from "react-icons/fa";
import type { User } from "../../types";
import { Avatar } from "../../components/ui/Avatar";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { RoleBadge } from "../../components/ui/RoleBadge";
import { UserForm } from "../../components/users/UserForm";
import { Loader } from "../../components/ui/Loader";
import { useUsers } from "../../context/UserContext";

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { setFilteredUsers, filteredUsers } = useUsers();

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const userData = await userService.getUserById(parseInt(id));

        if (!userData) {
          setError("User not found");
        } else {
          setUser(userData);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (updatedUser: User) => {
    try {
      const result = await userService.updateUser(updatedUser);
      setUser(result);
      setIsEditing(false);
      setSaveSuccess(true);

      const newFilteredUsers = filteredUsers.map((u) =>
        u.id === result.id ? result : u
      );
      setFilteredUsers(newFilteredUsers);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to update user:", err);
      setError("Failed to update user. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900 p-4 rounded-md">
        <p className="text-red-800 dark:text-red-200">{error}</p>
        <Link
          to="/users"
          className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          <LuArrowLeft size={16} className="mr-1" /> Back to Users
        </Link>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/users")}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Back to users"
          >
            <LuArrowLeft
              size={20}
              className="text-gray-600 dark:text-gray-300"
            />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            User Details
          </h1>
        </div>

        {!isEditing && (
          <button
            onClick={handleEdit}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaUserEdit size={16} className="mr-2" /> Edit User
          </button>
        )}
      </div>

      {saveSuccess && (
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-md">
          <p className="text-green-800 dark:text-green-200">
            User information updated successfully!
          </p>
        </div>
      )}

      {isEditing ? (
        <UserForm user={user} onSubmit={handleSubmit} onCancel={handleCancel} />
      ) : (
        <div className="bg-white dark:bg-gray-900 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                User Profile
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Personal details and information.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <StatusBadge status={user.status} />
              <RoleBadge role={user.role} />
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center">
                <div className="mr-4">
                  <Avatar src={user.avatar} name={user.name} size="large" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <dl>
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  <LuBuilding size={16} className="mr-2" />
                  Department
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                  {user.department}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailPage;
