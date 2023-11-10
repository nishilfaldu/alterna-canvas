import axios from "axios";



export const getData = async url => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const result = await fetch(url, requestOptions).then(res => res.json());

    return result;
  };

  export const postData = async (url, data) => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
      body: JSON.stringify(data),
    };

    const result = await fetch(url, requestOptions).then(res => res.json());

    return result;
  };

  export const deleteData = async url => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    const result = await fetch(url, requestOptions).then(res => res.json());

    return result;
  };

  export const putData = async (url, data) => {
    const res = await axios.put(url, data);

    return res.data;
  };