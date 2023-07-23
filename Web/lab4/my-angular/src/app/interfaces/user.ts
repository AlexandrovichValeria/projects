export interface User {
  id: string,
  name: string,
  date_of_birth: string,
  email: string,
  role: string,
  status: string,
  friends: string[],
  avatar_url: string,
  password: string
}
