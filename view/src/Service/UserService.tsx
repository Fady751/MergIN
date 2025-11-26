import type {
  IuserProfile as User,
  IusersOnline as onlineUser,
  IuserSignup as signupUser,
  Iadduser as token,
} from "../Types/Iuser";

import { gql } from "@apollo/client";
import { client } from "../apollo";

async function getUserById(id: number): Promise<User | null> {
  const GET_USER_BY_ID = gql`
    query GetUser($id: Int!) {
      user(id: $id) {
        id
        username
        email
        jobProfiles {
          id
          title
        }
      }
    }
  `;

  try {
    const { data } = await client.query<{ user: User }>({
      query: GET_USER_BY_ID,
      variables: { id },
    });

    return data.user || null;
  } catch (error) {
    // console.error("Error fetching user:", error);
    return null;
  }
}

async function CheckUserEmail(email: string): Promise<boolean> {
  const GET_USER_BY_EMAIL = gql`
    query GetUserByEmail($email: String!) {
      userByEmail(email: $email) {
        id 
      }
    }`;

  try {
    const { data } = await client.query<{ email: string }>({
      query: GET_USER_BY_EMAIL,
      variables: { email },
    });

    return data == null;
  } catch (error) {
    // console.error("Error fetching user by email:", error);
    return false;
  }
}

async function AddUser({
  username,
  email,
  password,
}: signupUser): Promise<{ data: { createUser: { accessToken: string } } } | null> {
  const Add_User = gql`
    mutation CreateUser($input: CreateUserInput!) {
      createUser(createUserInput: $input) {
        accessToken
      }
    }
  `;

  

  try {
    const { data } = await client.mutate({
      mutation: Add_User,
      variables: {
        input: {
          username,
          email,
          password,
        },
      },
    });

    return data || null;
  } catch (error: any) {
    console.error("GraphQL Errors:", error?.graphQLErrors);
    console.error("Network Error:", error?.networkError);
    return null;
  }
}


export {  AddUser, getUserById };
