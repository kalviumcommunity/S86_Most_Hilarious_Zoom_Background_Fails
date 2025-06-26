// CommentsPage.jsx
import React, { useState, useEffect } from 'react';

const CommentsPage = () => {
  const [users, setUsers] = useState([]); // State for users
  const [selectedUser, setSelectedUser] = useState(''); // State for selected user
  const [comments, setComments] = useState([]); // State for comments

  // Fetch users on component mount
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Handle dropdown selection and fetch comments for selected user
  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);

    if (userId === '') {
      // Fetch all comments if "All" is selected
      fetch('/api/comments')
        .then(res => res.json())
        .then(data => {
          setComments(data);
        })
        .catch(error => console.error('Error fetching all comments:', error));
    } else {
      // Fetch comments for the selected user
      fetch(`/api/comments/user/${userId}`)
        .then(res => res.json())
        .then(data => {
          setComments(data);
        })
        .catch(error => console.error('Error fetching comments by user:', error));
    }
  };

  // Fetch all comments on initial load
  useEffect(() => {
    fetch('/api/comments')
      .then(res => res.json())
      .then(data => {
        setComments(data);
      })
      .catch(error => console.error('Error fetching all comments:', error));
  }, []);

  return (
    <div>
      <h2>ASAP Comments</h2>

      {/* Dropdown to filter comments by user */}
      <label>Filter by User: </label>
      <select onChange={handleUserChange} value={selectedUser}>
        <option value="">All</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>

      {/* Display comments in a table */}
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {comments.length > 0 ? (
            comments.map(comment => (
              <tr key={comment.id}>
                <td>{comment.User?.name}</td>  {/* User name linked to comment */}
                <td>{comment.content}</td>     {/* Comment content */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No comments available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CommentsPage;
