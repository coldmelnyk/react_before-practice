/* eslint-disable react/jsx-filename-extension */
import cn from 'classnames';

export function TableBody({ people, selectedPeople, onSelectPeople }) {
  const isSelected = body => selectedPeople.includes(body.name);

  return (
    <tbody>
      {people.map(person => (
        <tr
          key={person.slug}
          className={cn({
            'has-background-link': person.sex === 'm' && !isSelected(person),
            'has-background-danger': person.sex === 'f' && !isSelected(person),
            'has-background-warning': isSelected(person),
          })}
        >
          <td>{person.name}</td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>
            <button
              onClick={() => onSelectPeople(person.name)}
              className="button"
            >
              {isSelected(person) ? '-' : '+'}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
