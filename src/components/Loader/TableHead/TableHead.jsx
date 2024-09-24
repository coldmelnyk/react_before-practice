/* eslint-disable react/jsx-filename-extension */

export function TableHead({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map(column => (
          <td key={column}>{column}</td>
        ))}
      </tr>
    </thead>
  );
}
