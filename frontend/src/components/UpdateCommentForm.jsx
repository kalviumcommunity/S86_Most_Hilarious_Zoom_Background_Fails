import { useState } from "react";

function UpdateCommentForm({ comment, onUpdate, onCancel }) {
  const [author, setAuthor] = useState(comment.author);
  const [text, setText] = useState(comment.text);
  const [createdBy, setCreatedBy] = useState(comment.created_by);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author || !text || !createdBy) {
      alert("Please fill in all fields.");
      return;
    }
    onUpdate({ ...comment, author, text, created_by: createdBy });
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
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default UpdateCommentForm;
