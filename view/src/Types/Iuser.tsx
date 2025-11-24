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

interface IuserProfile {
    userName: string;
    email: string;
    jobTitle: string;
    bio?: string;
    profilePhoto?: string;
}   


interface IusersOnline{
    userName: string;
    pfp: string;
}


export type { IuserLogin, IuserSignup, IuserProfile , IusersOnline};

