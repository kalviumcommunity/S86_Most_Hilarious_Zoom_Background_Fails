import { useState } from 'react';

function UpdateCommentForm({ comment, onUpdate }) {
  const [author, setAuthor] = useState(comment.author);
  const [text, setText] = useState(comment.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(comment._id, { author, text });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateCommentForm;
