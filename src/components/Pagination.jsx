import React from "react";

export default function Pagination({ current, total, pageSize, onChange }) {
  const last = Math.ceil(total / pageSize);
  const start = Math.max(1, current - 2);
  const end = Math.min(last, current + 2);
  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item${current === 1 ? " disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onChange(current - 1)}
          >
            «
          </button>
        </li>

        {start > 1 && (
          <li className="page-item disabled">
            <span className="page-link">…</span>
          </li>
        )}

        {pages.map((p) => (
          <li
            key={p}
            className={`page-item${p === current ? " active" : ""}`}
          >
            <button className="page-link" onClick={() => onChange(p)}>
              {p}
            </button>
          </li>
        ))}

        {end < last && (
          <li className="page-item disabled">
            <span className="page-link">…</span>
          </li>
        )}

        <li
          className={`page-item${current === last ? " disabled" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => onChange(current + 1)}
          >
            »
          </button>
        </li>
      </ul>
    </nav>
  );
}
