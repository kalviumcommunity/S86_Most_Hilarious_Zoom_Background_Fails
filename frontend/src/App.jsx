import { useEffect, useState } from "react";
import CommentForm from "./components/CommentForm";
import UpdateCommentForm from "./components/UpdateCommentForm";

function App() {
  const [comments, setComments] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchComments = async () => {
    const res = await fetch("http://localhost:3000/api/comments");
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleAdd = async (comment) => {
    await fetch("http://localhost:3000/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });
    fetchComments();
  };

  const handleUpdate = async (id, updated) => {
    await fetch(`http://localhost:3000/api/comments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setEditId(null);
    fetchComments();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/comments/${id}`, {
      method: "DELETE",
    });
    fetchComments();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>ASAP Comments</h1>
      <CommentForm onAdd={handleAdd} />
      <ul>
        {comments.map((c) => (
          <li key={c._id} style={{ marginBottom: "10px" }}>
            {editId === c._id ? (
              <UpdateCommentForm comment={c} onUpdate={handleUpdate} />
            ) : (
              <>
                <p>
                  <strong>{c.author}</strong>: {c.text}
                </p>
                <button onClick={() => setEditId(c._id)}>Edit</button>{" "}
                <button onClick={() => handleDelete(c._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
