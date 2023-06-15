import { gql } from '@apollo/client';

/**
 * Usuario detalle
 */
export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    user {
      id
      email
      lastName
      firstName
    }
  }
`;

/**
 * Nuevo ususario
 */
export const USER_SIGN_UP_MUTATION = gql`
  mutation UserSignUp($user: UserCreateInput!, $authProfileId: ID) {
    userSignUpWithToken(user: $user, authProfileId: $authProfileId) {
      id
      email
      lastName
      firstName
    }
  }
`;

/**
 * Tasks
 */
export const GET_ASSIGNED_TASKS = gql`
  query  GetAssignedTasks($userId: String){
    tasksList(
      orderBy: createdAt_DESC,
      filter: {
        user_assigned: {
          equals: $userId
        }
      }
    ) {
      items {
        id
        task_name
        description
        status
      }
    }
  }
`;


//GET todos los usuarios

export const GET_USERS_LIST = gql`
  query  users{
    usersList {
      items {
        id
        firstName
      }
    }
    
  }
`;

//POST nuevo task
export const SAVE_TASK_MUTATION = gql`
  mutation  taskCreate($input: TaskCreateInput!){
    taskCreate(data: $input) {
        id
    }
  }
`;

//actuaizar estado

export const MARK_TASK_COMPLETED = gql`
  mutation UpdateTaskForm($id: ID) {
    taskUpdate(data: {status: true}, filter: {id: $id}) {
      id
    }
  }
`; 

export const updateTaskStatus = async (taskId) => {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
 
    const response = await fetch('https://api.8base.com/climztc8e000009jtcyb31enk/webhook/tasks', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`, 
      },
      body: taskId,
    });

    if (response.ok) {
      console.log('Task status updated to complete.');
    } else {
      console.error('Failed to update task status.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
