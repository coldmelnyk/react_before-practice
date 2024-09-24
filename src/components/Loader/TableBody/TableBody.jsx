/* eslint-disable react/jsx-filename-extension */
import cn from 'classnames';

export function TableBody({ people }) {
  return (
    <tbody>
      {people.map(person => (
        <tr
          key={person.slug}
          className={cn({
            'has-background-link': person.sex === 'm',
            'has-background-danger': person.sex === 'f',
          })}
        >
          <td>{person.name}</td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <button className="button">+</button>
        </tr>
      ))}
    </tbody>
  );
}
