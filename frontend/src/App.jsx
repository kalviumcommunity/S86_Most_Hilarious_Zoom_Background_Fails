import { useEffect, useState } from "react";
import CommentForm from "./components/CommentForm";
import UpdateCommentForm from "./components/UpdateCommentForm";

function App() {
  const [comments, setComments] = useState([]);
  const [filterUser, setFilterUser] = useState("all");
  const [editingComment, setEditingComment] = useState(null);

  const fetchComments = async () => {
    const res = await fetch(`http://localhost:3000/api/comments${filterUser !== "all" ? `?user=${filterUser}` : ""}`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, [filterUser]);

  const handleAdd = async (comment) => {
    await fetch("http://localhost:3000/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });
    fetchComments();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/comments/${id}`, { method: "DELETE" });
    fetchComments();
  };

  const handleUpdate = async (updatedComment) => {
    await fetch(`http://localhost:3000/api/comments/${updatedComment._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedComment),
    });
    setEditingComment(null);
    fetchComments();
  };

  const uniqueUsers = [...new Set(comments.map(c => c.created_by))];

  return (
    <div>
      <h1>ASAP Comments</h1>

      <label>Filter by User: </label>
      <select onChange={e => setFilterUser(e.target.value)} value={filterUser}>
        <option value="all">All</option>
        {uniqueUsers.map(user => (
          <option key={user} value={user}>{user}</option>
        ))}
      </select>

      {editingComment ? (
        <UpdateCommentForm comment={editingComment} onUpdate={handleUpdate} />
      ) : (
        <CommentForm onAdd={handleAdd} />
      )}

      <ul>
        {comments.map(c => (
          <li key={c._id}>
            <strong>{c.author}</strong>: {c.text} ({c.created_by})
            <button onClick={() => setEditingComment(c)}>Edit</button>
            <button onClick={() => handleDelete(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
