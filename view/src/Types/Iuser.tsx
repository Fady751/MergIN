interface IuserLogin {
    email: string;
    password: string;
}

interface Iadduser{
    accessToken: string;
}


interface IloginResponse{
    id : number ;
    accessToken : string ;
}

interface IuserSignup {
    username: string;
    email: string;
    password: string;
    // jobId: string;
}
interface IUserStore{
    user : Iuser ;
    token : string 
}
interface JobProfile {
    id: number;
    userId?: number;
    title: string;
}

interface Iuser {
    id: number;
    username?: string;
    email: string;
    bio?: string; // backend needs to be updated to include bio
    pfp?: string; // profile picture
    JobProfiles?: JobProfile[];
}


interface IusersOnline{
    username: string;
    pfp?: string;
}


export type { IuserLogin, IuserSignup, Iuser , IusersOnline, JobProfile , Iadduser , IUserStore , IloginResponse };

