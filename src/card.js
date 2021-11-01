import React from 'react';

export default function Card({ data }) {
  if (!data || Object.keys(data).length < 1) return null;
  const { number, title, created_at, state, user } = data;
  return (
    <div className="card">
      <div className="card-header">ISSUE: {number}</div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>{title}</p>
          <footer className="blockquote-footer">
            Fecha Creación : <cite>{created_at}</cite>
          </footer>
          <footer className="blockquote-footer">
            Usuario Creación : <cite>{user['login'] || 'Not Found'}</cite>
          </footer>
          <footer className="blockquote-footer">
            Estado : <cite>{state}</cite>
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
