import { useQuery } from '@apollo/client';

import { CURRENT_USER_QUERY } from 'shared/graphql';

export const Profile = () => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY);

  return (
    <div className="container">
      <h1 className="text-center mt-5">Welcome, Profile!</h1>
      {data && (
        <div className="mt-5">
          <h1 className="text-center">{data.user.email}</h1>
          <ul className="list-group mt-3">
            <li className="list-group-item">ID: {data.user.id}</li>
            <li className="list-group-item">
              Name: {data.user.firstName} {data.user.lastName}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
