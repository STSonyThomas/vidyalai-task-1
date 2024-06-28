import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const Table = styled.table(() => ({
  width: '100%',
  borderCollapse: 'collapse',

  th: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    cursor: 'pointer',
  },

  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },

  '.sort-icon': {
    verticalAlign: 'middle',
    marginLeft: '5px',
  },
}));

const columnFields = [
  { value: 'id', label: 'Id' },
  { value: 'name', label: 'Name', enableSearch: true },
  { value: 'email', label: 'Email', enableSearch: true },
  { value: 'username', label: 'Username' },
  { value: 'phone', label: 'Phone' },
  { value: 'website', label: 'Website' },
];

const useUserData = () => {
  const [state, setState] = useState({
    users: [],
    filteredUsers: [],
    searchName: '',
    searchEmail: '',
    sortColumn: columnFields[0].value,
    sortDirection: 'asc',
  });

  useEffect(() => {
    (async function () {
      const { data: users } = await axios.get('/api/v1/users');
      setState(prevState => ({
        ...prevState,
        users: users,
        filteredUsers: users,
      }));
    })();
  }, []);

  useEffect(() => {
    let filteredUsers = state.users.filter(
      user =>
        user.name.toLowerCase().includes(state.searchName.toLowerCase()) &&
        user.email.toLowerCase().includes(state.searchEmail.toLowerCase()),
    );

    if (state.sortColumn) {
      filteredUsers.sort((a, b) => {
        const x = a[state.sortColumn];
        const y = b[state.sortColumn];
        if (x < y) return state.sortDirection === 'asc' ? -1 : 1;
        if (x > y) return state.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setState(prevState => ({ ...prevState, filteredUsers: filteredUsers }));
  }, [
    state.searchName,
    state.searchEmail,
    state.users,
    state.sortColumn,
    state.sortDirection,
  ]);

  const handleOnSearch = event => {
    let { name, value } = event.target;

    if (name === 'name') {
      name = 'searchName';
    } else if (name === 'email') {
      name = 'searchEmail';
    } else {
      throw new Error('Unknown search element');
    }

    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSort = column => {
    if (state.sortColumn === column) {
      setState(prevState => ({
        ...prevState,
        sortDirection: prevState.sortDirection === 'asc' ? 'desc' : 'asc',
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        sortColumn: column,
        sortDirection: 'asc',
      }));
    }
  };

  return {
    users: state.filteredUsers,
    handleOnSearch,
    handleSort,
    sortColumn: state.sortColumn,
    sortDirection: state.sortDirection,
  };
};

const UserList = () => {
  const { users, handleOnSearch, handleSort, sortColumn, sortDirection } =
    useUserData();

  return (
    <div>
      <Table>
        <thead>
          <tr>
            {columnFields.map(field => {
              return (
                <th key={field.value}>
                  <div
                    onClick={() => handleSort(field.value)}
                    style={{ paddingBottom: 8 }}
                  >
                    {field.label}
                    {sortColumn === field.value &&
                      (sortDirection === 'asc' ? (
                        <span className={'sort-icon'}>▲</span>
                      ) : (
                        <span className={'sort-icon'}>▼</span>
                      ))}
                  </div>

                  {field.enableSearch ? (
                    <input
                      type={'text'}
                      placeholder={`Search by ${field.label}`}
                      name={field.value}
                      onChange={handleOnSearch}
                      style={{ padding: 6, width: 200 }}
                    />
                  ) : null}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              {columnFields.map(field => (
                <td key={field.value}>{user[field.value]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div></div>
    </div>
  );
};

export default UserList;
