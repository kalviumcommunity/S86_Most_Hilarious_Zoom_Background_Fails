import { useEffect, useState } from "react";

function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/comments")
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Error fetching comments:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <ul className="space-y-2">
        {comments.map((comment) => (
          <li key={comment._id} className="border p-2 rounded shadow">
            <p><strong>User:</strong> {comment.user}</p>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
