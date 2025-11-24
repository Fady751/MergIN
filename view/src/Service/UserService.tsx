import type { IuserProfile as User } from '../Types/Iuser';
import { gql } from '@apollo/client';
import { client } from '../apollo';

async function getUserById(id: number): Promise<User | null> {
  const GET_USER_BY_ID = gql`
    query GetUser($id: Int!) {
      user(id: $id) {
        id
        username
        email
        jobProfiles{
          id
          title
        }
      }
    }
  `;

  try {
    const { data } = await client.query<{ user: User }>({
      query: GET_USER_BY_ID,
      variables: { id }
    });

    return data.user || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export { getUserById };