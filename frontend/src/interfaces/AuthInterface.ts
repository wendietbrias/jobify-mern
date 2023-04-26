export interface stateLogin {
    email:string 
    password:string 
  }

export interface stateRegister {
    username:string 
    email:string 
    password:string 
    confirm:string 
}

export interface AuthState {
  token:string | null,
  user:{
      name:string
      email:string
      _id:string  
      iat:string | number | Date
  } | null
};