import { ApiClientBase } from "../ApiClientBase";
import { apiRequester } from "../ApiRequester";
import { ApiUser, ResponseWithData } from "../api.types";

export class UserApiMixin {
  requester: typeof apiRequester;

  async loadUser(id: string) {
    return (await this.requester.get(
      `/users/${id}`
    )) as ResponseWithData<ApiUser>;
  }

  async updateUser(id: string, data: Partial<ApiUser>) {
    return (await this.requester.patch(
      `/users/${id}`,
      data
    )) as ResponseWithData<{}>;
  }

  async deleteUser(id: string) {
    return (await this.requester.delete(
      `/users/${id}`
    )) as ResponseWithData<{}>;
  }
}
