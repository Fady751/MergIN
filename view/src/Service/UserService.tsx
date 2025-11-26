import type {
  Iuser as User,
  IusersOnline as onlineUser,
  IuserSignup as signupUser,
  IuserLogin as loginUser ,
  IloginResponse ,
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

async function AddUser({
  username,
  email,
  password,
}: signupUser): Promise<{ data: { createUser: { accessToken: string } } } | null> {
  const Add_User = gql`
    mutation CreateUser($input: CreateUserInput!) {
      createUser(createUserInput: $input) {
      user{
        id 
      }
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
  } catch (error) {
    console.log("error on sign user up " ,error) ;
    return null;
  }
}


async function login ({email , password} : loginUser) : Promise< IloginResponse | null >{

  const query =gql`
      mutation {
        loginUser(email: "${email}", password: "${password}") {
          id
          accessToken
        }
      }
    `;

  try {

    const {data} = await client.mutate({
      mutation : query ,
      variables: {
          email,
          password
      },
    });

    return data || null ;

  }catch(error){
    console.log("error on login user" , error);
    return null ;
  }
}


export {  AddUser, getUserById , login };
