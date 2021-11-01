import React from 'react';

/**
 * Componente para desplegar lista de busqueda
 */
export default function List({ data, value, onClick }) {
  if (!data || (Object.keys(data).length < 1 && value))
    return (
      <p className="text-center text-warning">
        No se encontraton resultados para : {value}
      </p>
    );
  return (
    <ul className="list-group">
      {data.map((item) => (
        <li
          key={item.id}
          onClick={() => onClick(item)}
          className="list-group-item"
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
}
