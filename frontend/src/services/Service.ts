import { BACKEND_URL } from "../const";
import { Request } from "./Request";

export class Service {
  public token: string = "ABC";
  public domain: string = BACKEND_URL;

  public newRequest(path: string) {
    return new Request(this.domain + "/api" + path, this.token)
  }
}