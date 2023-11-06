import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";

import { uploadFile } from "../../../scripts/uploadFile";



const UploadFile = ({ courseID, folderType, fileName }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const handleUpload = () => {
    // uploadFile(courseID, folderType, fileName);
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      message.success("File uploaded successfully");
      }, 1000);      
    };

  const props = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
    multiple: false,
  };

  return (
    <>
      <Upload {...props} maxCount={1}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
          backgroundColor: "blue",
          color: "white",
        }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </>
  );
};
export default UploadFile;

UploadFile.propTypes = {
  courseID: PropTypes.string,
  folderType: PropTypes.string,
  fileName: PropTypes.string,
};