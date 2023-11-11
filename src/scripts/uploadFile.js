import { message } from "antd";

import { s3Obj } from "../storage/s3";



export const uploadFile = async (courseName, folderType) => {
    const params = {
        Bucket: import.meta.env.VITE_BUCKET_NAME,
        Key: `courses/${courseName}/${folderType}/`,
      };

    var upload = s3Obj
      .putObject(params)
      .on("httpUploadProgress", evt => {
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%",
        );
      })
      .promise();

    await upload.then(err => {
        if(err) { message.error("There was an error uploading the file"); }    
        else {
            message.success("File uploaded successfully");
        }
    });
  };