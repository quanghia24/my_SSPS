// import { useCookies } from "react-cookie";

export default class UserAPIs {
static LoginUser(body){
    return fetch("http://127.0.0.1:8000/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    }).then(res => res.json());
  }
  static RegisterUser(body){
    return fetch("http://127.0.0.1:8000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    }).then(res => res.json());
  }

}