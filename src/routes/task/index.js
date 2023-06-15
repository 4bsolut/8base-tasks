import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ASSIGNED_TASKS, updateTaskStatus } from 'shared/graphql';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
 

export const Task = () => {

  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
   
  const { loading, error, data, history } = useQuery(GET_ASSIGNED_TASKS, 
    { variables: String('cliqtuss300ib08miakzkat2u'),
     onCompleted: (data) => {
      setTasks(data.tasksList.items);
    }, pollInterval: 2000, },
  );

 

  useEffect(async () => {
    
    if (!loading && !error && data) {
       setTasks(data.tasksList.items);
    }
  }, [loading, error, data]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleToggle = async(taskId) => {
    await updateTaskStatus(taskId)
    toast.success('Task Completed!')
  };

  return (
    <div className="container">
      <h2>Assigned Tasks</h2>
      <p>
        <Link to="/new">New Task</Link> |{' '}
        <a href="#" className="btn btn-link" onClick={() => setShowCompleted(!showCompleted)}>
          {showCompleted ? 'Hide Completed' : 'Show Completed'}
        </a>
      </p>

      {!tasks ? (
        <p>You don't have any tasks yet.</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => {
            if (showCompleted || !task.status) {
              return (
                <li className="list-group-item" key={task.id}>
                  <h3>{task.task_name}</h3>
                  <p>{task.description}</p>
                  <p>Status: {task.status ? 'Completa' : 'Incompleta'}</p>
                  {!task.status && (
                    <button className="btn btn-primary" onClick={() => handleToggle(task.id)}>
                      Mark as Completed
                    </button>
                  )}
                </li>
              );
            }
            return null;
          })}
        </ul>
      )}
    </div>
  );
};
