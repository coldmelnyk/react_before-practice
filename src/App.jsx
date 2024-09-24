/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import cn from 'classnames';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';
import { TableHead } from './components/Loader/TableHead/TableHead';

import peopleFromServer from './people.json';
import { TableBody } from './components/Loader/TableBody/TableBody';
const columns = ['name', 'sex', 'born'];

const SORT_TYPE_SEX_F = 'sex_f';
const SORT_TYPE_SEX_M = 'sex_M';
const SORT_TYPE_BORN_DOWN = 'born_down';
const SORT_TYPE_BORN_UP = 'born_up';

function sortingAndFiltering(array, sortTypeSex, sortTypeBorn, filter) {
  let arrayCopy = [...array];

  if (sortTypeSex === SORT_TYPE_SEX_F) {
    arrayCopy.sort((person1, person2) =>
      person1.sex.localeCompare(person2.sex),
    );
  }

  if (sortTypeSex === SORT_TYPE_SEX_M) {
    arrayCopy.sort((person1, person2) =>
      person2.sex.localeCompare(person1.sex),
    );
  }

  if (sortTypeBorn === SORT_TYPE_BORN_DOWN) {
    arrayCopy.sort((person1, person2) => person1.born - person2.born);
  }

  if (sortTypeBorn === SORT_TYPE_BORN_UP) {
    arrayCopy.sort((person1, person2) => person2.born - person1.born);
  }

  if (filter) {
    arrayCopy = arrayCopy.filter(person =>
      person.name.toLowerCase().trim().includes(filter.toLowerCase().trim()),
    );
  }

  return arrayCopy;
}

export function App() {
  const [sexSorting, setSexSorting] = useState('');
  const [bornSorting, setBornSorting] = useState('');
  const [filtering, setFiltering] = useState('');
  const [selectedPeople, setSelectedPeople] = useState([]);

  const handlerSelectPeople = name => {
    if (!selectedPeople.includes(name)) {
      const newArray = [...selectedPeople, name];

      setSelectedPeople(newArray);
    }

    if (selectedPeople.includes(name)) {
      let newArray = [...selectedPeople];

      newArray = newArray.filter(person => person !== name);

      setSelectedPeople(newArray);
    }
  };

  const handleFilter = text => setFiltering(text);

  const handleSexSorting = () => {
    if (!sexSorting) {
      setSexSorting(SORT_TYPE_SEX_F);
    }

    if (sexSorting === SORT_TYPE_SEX_F) {
      setSexSorting(SORT_TYPE_SEX_M);
    }

    if (sexSorting === SORT_TYPE_SEX_M) {
      setSexSorting('');
    }
  };

  const handleBornSorting = () => {
    if (!bornSorting) {
      setBornSorting(SORT_TYPE_BORN_DOWN);
    }

    if (bornSorting === SORT_TYPE_BORN_DOWN) {
      setBornSorting(SORT_TYPE_BORN_UP);
    }

    if (bornSorting === SORT_TYPE_BORN_UP) {
      setBornSorting('');
    }
  };

  const handleReset = () => {
    setSexSorting('');
    setBornSorting('');
    setFiltering('');
    setSelectedPeople('');
  };

  const processedPeople = sortingAndFiltering(
    peopleFromServer,
    sexSorting,
    bornSorting,
    filtering,
  );

  const hasNoSortOrFiltParam =
    !sexSorting && !bornSorting && !filtering && selectedPeople.length === 0;

  return (
    <div className="box">
      <h1 className="title grid">People table</h1>

      <div className="table">
        <button
          onClick={handleSexSorting}
          className={cn(
            'button',
            { 'has-background-light': sexSorting !== '' },
            { 'has-text-danger': sexSorting !== '' },
          )}
        >
          SORT SEX
        </button>
        <button
          onClick={handleBornSorting}
          className={cn(
            'button',
            { 'has-background-light': bornSorting !== '' },
            { 'has-text-danger': bornSorting !== '' },
          )}
        >
          SORT BORN
        </button>

        {!hasNoSortOrFiltParam && (
          <button onClick={handleReset} className="button">
            RESET
          </button>
        )}

        <br />
        <span>Find by name:</span>
        <br />
        <input
          value={filtering}
          onChange={query => handleFilter(query.target.value)}
          type="text"
        />
      </div>

      <table className="table is-striped is-narrow">
        <TableHead columns={columns} />

        <TableBody
          people={processedPeople}
          selectedPeople={selectedPeople}
          onSelectPeople={handlerSelectPeople}
        />
      </table>
    </div>
  );
}
