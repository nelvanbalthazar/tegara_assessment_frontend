import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsers, updateUserRole, selectUsers} from '../store/slices/userSlice';

import './UserListPage.css';
import MainLayout from '../components/MainLayout';

const roles = ['ADMIN', 'RECRUITER', 'VIEWER'];

interface User {
  id: number;
  email: string;
  role: string;
}

const UserListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChangeRole = async (userId: number, newRole: string) => {
    setLoading(true);
    await dispatch(updateUserRole({ userId, role: newRole }));
    setLoading(false);
  };

  return (
    <MainLayout>
    <div className="user-list-wrapper">
      <h2>User Management</h2>
      {loading && <p>Updating role...</p>}
      <table className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Current Role</th>
            <th>Update Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <select
                  value={user.role}
                  onChange={e => handleChangeRole(user.id, e.target.value)}
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </MainLayout>
  );
};

export default UserListPage;
