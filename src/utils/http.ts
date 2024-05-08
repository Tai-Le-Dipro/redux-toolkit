import axios, { AxiosInstance } from "axios";

class Http {
  public client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:4000",
      timeout: 10000
    });
  }
}

const http = new Http().client;

export default http;
