import { query } from '../config/db';
import { createUser as _createUser, getUserById as _getUserById, updateUserById as _updateUserById, deleteUserById as _deleteUserById } from '../queries/userQueries';

class UserService {
  async createUser(userData) {
    const { fname, lname, email, password, contact_no } = userData;
    const result = await query(_createUser, [
      fname, lname, email, password, contact_no,
    ]);
    return result.rows[0];
  }

  async getUserById(userId) {
    const result = await query(_getUserById, [userId]);
    return result.rows[0];
  }

  async updateUserById(userId, updateData) {
    const { fname, lname, email, contact_no } = updateData;
    const result = await query(_updateUserById, [
      fname, lname, email, contact_no, userId,
    ]);
    return result.rows[0];
  }

  async deleteUserById(userId) {
    const result = await query(_deleteUserById, [userId]);
    return result.rows[0];
  }
}

export default new UserService();
