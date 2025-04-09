import { useState } from 'react';

function CommentForm({ onAdd }) {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ author, text });
    setAuthor('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Comment" />
      <button type="submit">Add Comment</button>
    </form>
  );
}

export default CommentForm;
