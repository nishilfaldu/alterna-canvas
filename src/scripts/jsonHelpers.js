export const getData = async url => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const result = await fetch(url, requestOptions).then(res => res.json());

    return result;
  };