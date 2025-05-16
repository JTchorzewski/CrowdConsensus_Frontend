import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');
  const submit = e => {
    e.preventDefault();
    onSearch(q.trim());
  };

  return (
    <form className="input-group mb-3" onSubmit={submit}>
      <input
        type="text"
        className="form-control"
        placeholder="Szukaj spółki…"
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Szukaj
      </button>
    </form>
  );
}
