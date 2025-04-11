import { useState } from "react";

function CommentForm({ onAdd }) {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author || !text || !createdBy) {
      alert("Please fill in all fields.");
      return;
    }
    onAdd({ author, text, created_by: createdBy });
    setAuthor("");
    setText("");
    setCreatedBy("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
      />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Comment"
      />
      <input
        value={createdBy}
        onChange={(e) => setCreatedBy(e.target.value)}
        placeholder="Created by"
      />
      <button type="submit">Add Comment</button>
    </form>
  );
}

export default CommentForm;
