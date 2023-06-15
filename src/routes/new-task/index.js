import React, { useState, useEffect } from 'react';
import { GET_USERS_LIST, SAVE_TASK_MUTATION } from 'shared/graphql';
import { useQuery, useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import toast from 'react-hot-toast';

const NewTask = () => {
  const [newTask, setNewTask] = useState({ task_name: '', description: '', status: false });
  const [userList, setUserList] = useState([]);
  const { loading, error, data } = useQuery(GET_USERS_LIST, { variables: String('cliqtuss300ib08miakzkat2u') });
  const apolloClient = useApolloClient();
  const history = useHistory();

  const fetchUserList = async () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    setUserList(data.usersList.items);
  };

  useEffect(() => {
    fetchUserList();
  }, [loading, error, data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === 'checkbox' ? checked : value;
    setNewTask((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      apolloClient.mutate({
        mutation: SAVE_TASK_MUTATION,
        variables: {
          input: newTask,
        },
      });

      setNewTask({ task_name: '', description: '', status: false });
      toast.success('Task added!');
      history.push('/');
      history.replace('/tasks');
    } catch (error) {
      toast.error('An error');
      console.error(error);
    } 
  };
  return (
    <>
    <div className="container m-15">
      <h2>Add a Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-4">
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            name="task_name"
            required
            value={newTask.task_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-4">
          <label>Assigned User:</label>
          <select
            required
            className="form-control"
            name="user_assigned"
            value={newTask.user_assigned}
            onChange={handleChange}
          >
            <option value="">Select User</option>
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group my-4">
          <label>Description:</label>
          <textarea
            required
            className="form-control"
            name="description"
            value={newTask.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
    </div>
    </>
  );
};

export default NewTask;
