export const getAllUsers = `SELECT * FROM users`;
export const createUser = `
      INSERT INTO users (fname, lname, email, password, contact_no)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
export const getUserById = `
      SELECT * FROM users WHERE id = $1;
    `;
export const updateUserById = `
      UPDATE users SET fname = $1, lname = $2, email = $3, contact_no = $4
      WHERE id = $5 RETURNING *;
    `;
export const deleteUserById = `
      DELETE FROM users WHERE id = $1 RETURNING *;
    `;  