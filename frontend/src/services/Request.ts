export class Request {
  private _url: string;
  private token: string;

  constructor(url: string, token: string) {
    this._url = url;
    this.token = token;
  }

  public request(method: string, data?: any): Promise<any> {
    return fetch(this._url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    }).then((response) => response.json());
  }

  public get(): Promise<any> {
    return this.request("GET");
  }

  public post(data: any): Promise<any> {
    return this.request("POST", data);
  }
  
  public put(data: any): Promise<any> {
    return this.request("PUT", data);
  }

  public delete(): Promise<any> {
    return this.request("DELETE");
  }
}