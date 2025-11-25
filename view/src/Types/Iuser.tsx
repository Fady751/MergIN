interface IuserLogin {
    userName: string;
    password: string;
}


interface IuserSignup {
    userName: string;
    email: string;
    password: string;
    jobTitle: string;
}

interface JobProfile {
    id: number;
    userId?: number;
    title: string;
}

interface IuserProfile {
    id: number;
    userName: string;
    email: string;
    bio?: string; // backend needs to be updated to include bio
    pfp?: string; // profile picture
    JobProfiles?: JobProfile[];
}


interface IusersOnline{
    userName: string;
    pfp?: string;
}


export type { IuserLogin, IuserSignup, IuserProfile , IusersOnline, JobProfile};

