import axios, { AxiosRequestConfig } from "axios";

export class HttpService {
  baseUrl = "http://localhost:3000/api/";

  get(endpoint: string, headers = {}) {
    return new Promise((resolve, reject) => {
      const config: AxiosRequestConfig = {
        url: this.baseUrl + endpoint,
        method: "get",
        headers: headers,
      };
      axios(config)
        .then((res: any) => {
          if (res.status && (res.status === 200 || res.status === 201)) {
            resolve(res.data);
          } else {
            reject(res.message);
          }
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
  getById(endpoint: string, id: string, headers = {}) {
    return new Promise((resolve, reject) => {
      const config: AxiosRequestConfig = {
        url: this.baseUrl + endpoint + "/" + id,
        method: "get",
        headers: headers,
      };
      axios(config)
        .then((res: any) => {
          if (res.status && (res.status === 200 || res.status === 201)) {
            resolve(res.data);
          } else {
            reject(res.message);
          }
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  put(endpoint: string, data: any, id: string, headers = {}) {
    return new Promise((resolve, reject) => {
      const config: AxiosRequestConfig = {
        url: this.baseUrl + endpoint + "/" + id,
        method: "put",
        headers: headers,
        data: data,
      };
      axios(config)
        .then((res: any) => {
          if (res.status && (res.status === 200 || res.status === 201)) {
            resolve(res.data);
          } else {
            reject(res.message);
          }
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  post(endpoint: string, data: any, headers = {}) {
    return new Promise((resolve, reject) => {
      const config: AxiosRequestConfig = {
        url: this.baseUrl + endpoint,
        method: "post",
        headers: headers,
        data: data,
      };
      axios(config)
        .then((res: any) => {
          if (res.status && (res.status === 200 || res.status === 201)) {
            resolve(res.data);
          } else {
            reject(res.message);
          }
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  }

  delete(endpoint: string, id: string, headers = {}) {
    return new Promise((resolve, reject) => {
      const config: AxiosRequestConfig = {
        url: this.baseUrl + endpoint + "/" + id,
        method: "delete",
        headers: headers,
      };
      axios(config)
        .then((res: any) => {
          if (res.status && (res.status === 200 || res.status === 201)) {
            resolve(res.data);
          } else {
            reject(res.message);
          }
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
}
