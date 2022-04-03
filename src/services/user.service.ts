import { AxiosResponse } from "axios";
import API from "../api";
import User from "../models/User";
import { UserParams } from "../types";

class UserService {
  static pathname = "/users";
  //TODO::
  // @GET
  // @Post
  // @Delete
  // @PUT
  // @Patch

  private getHeadersWithToken = () => {
    const TOKEN = process.env.REACT_APP_API_TOKEN;
    return {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };
  };

  get: (params: UserParams) => Promise<AxiosResponse<Array<User>>> = (
    params
  ) => {
    const headers = this.getHeadersWithToken();

    return API.get(UserService.pathname, {
      params: params,
      ...headers,
    });
  };

  getById: (id: string) => Promise<AxiosResponse<User>> = (id) => {
    /// Adding a token here because without the token the newly created/modified can't be found.
    const headers = this.getHeadersWithToken();
    const pathname = `${UserService.pathname}/${id}`;
    return API.get(pathname, {
      ...headers,
    });
  };

  create: (data: User) => Promise<AxiosResponse<User>> = (data) => {
    const headers = this.getHeadersWithToken();
    console.log("headers", headers);
    return API.post(UserService.pathname, data, {
      ...headers,
    });
  };

  modify: (id: string | number, data: User) => Promise<AxiosResponse<any>> = (
    id,
    data
  ) => {
    const headers = this.getHeadersWithToken();
    const pathname = `${UserService.pathname}/${id}`;
    return API.put(pathname, data, {
      ...headers,
    });
  };
  delete: (id: string | number) => Promise<AxiosResponse<any>> = (id) => {
    const pathname = `${UserService.pathname}/${id}`;
    const headers = this.getHeadersWithToken();

    return API.delete(pathname, {
      ...headers,
    });
  };
}
export default new UserService();
