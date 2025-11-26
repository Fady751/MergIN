interface IuserLogin {
    username: string;
    password: string;
}

interface Iadduser{
    accessToken: string;
}
interface IuserSignup {
    username: string;
    email: string;
    password: string;
    // jobId: string;
}

interface JobProfile {
    id: number;
    userId?: number;
    title: string;
}

interface IuserProfile {
    id: number;
    username: string;
    email: string;
    bio?: string; // backend needs to be updated to include bio
    pfp?: string; // profile picture
    JobProfiles?: JobProfile[];
}


interface IusersOnline{
    username: string;
    pfp?: string;
}


export type { IuserLogin, IuserSignup, IuserProfile , IusersOnline, JobProfile , Iadduser};

