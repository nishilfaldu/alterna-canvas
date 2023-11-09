import axios from "axios";



axios.put("http://localhost:3030/students/1/", {
    name: "hello world",
}).then(resp => {
    console.log(resp.data);
}).catch(error => {
    console.log(error);
});

export const putData = async (url, data) => {
    console.log(data, "data before putting");
    var requestOptions = {
      method: "PUT",
      body: JSON.stringify(data),
    };

    try {
        const response = await fetch(url, requestOptions);
        
        if (response.ok) {
          const result = await response.json();
          console.log(result);

          return result;
        } else {
          console.error("PUT request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error during PUT request:", error);
      }
  };