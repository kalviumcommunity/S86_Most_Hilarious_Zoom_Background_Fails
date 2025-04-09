import { useEffect, useState } from 'react';
import CommentForm from "./components/CommentForm";




function App() {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await fetch('http://localhost:3000/api/comments');
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ASAP Zoom Fails App</h1>
      <CommentForm onCommentAdded={fetchComments} />
      <h2 className="text-xl mt-6 font-semibold">Comments</h2>
      <ul className="mt-2 space-y-2">
        {comments.map((comment) => (
          <li key={comment._id} className="p-2 bg-gray-100 rounded">{comment.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
