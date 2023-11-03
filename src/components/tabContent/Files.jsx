import { DownloadOutlined } from "@ant-design/icons";
import { Button, Table, Tree } from "antd";
import AWS from "aws-sdk";
import PropTypes from "prop-types";
import { useState } from "react";

import { handleDownload } from "../../scripts/downloadFile";
import { createFolderToFileMap, createTreeStructure } from "../../scripts/tree";



const { DirectoryTree } = Tree;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Actions",
    dataIndex: "action",
    key: "action",
  },
];

function Files({ courseID }) {
  const [treeData, setTreeData] = useState();
  const [dataSource, setDataSource] = useState();
  const [folderToFileMap, setFolderToFileMap] = useState();

  AWS.config.update({
    // eslint-disable-next-line no-undef
    accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
    // eslint-disable-next-line no-undef
    secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
    // eslint-disable-next-line no-undef
    region: import.meta.env.VITE_REGION,
  });

  async function listFiles(courseID, folderType) {
    const s3 = new AWS.S3({
      signatureVersion: "v4",
    });
    const params = {
      // eslint-disable-next-line no-undef
      Bucket: import.meta.env.VITE_BUCKET_NAME,
      Prefix: folderType ? `courses/${courseID}/${folderType}/` : `courses/${courseID}/`, // Optional: Only list files in a specific directory
    };
  
    try {
      const data = await s3.listObjectsV2(params).promise();
      const files = data.Contents.map(file => file.Key);

      const folderToFileMap = createFolderToFileMap(files);
      const treeData = createTreeStructure(folderToFileMap);
      setTreeData(treeData);
      setFolderToFileMap(folderToFileMap);

      return treeData;
    } catch (error) {
      console.error("Error listing files:", error);
    }
  }

  listFiles(courseID, null);


  const onSelect = keys => {
    const dataSource = folderToFileMap.get(keys[0]).map(file => ({
      key: file,
      name: file,
      action: <Button icon={<DownloadOutlined />} onClick={() => handleDownload(courseID, keys[0], file)}></Button>,
    }));
    setDataSource(dataSource);
    // console.log("Trigger Select", keys, info);
  };
  // const onExpand = keys => {
  //   // console.log("Trigger Expand", keys, info);
  // };

  return (
    <div className="flex flex-row">
      <DirectoryTree
        height={500}
        multiple
        defaultExpandAll
        onSelect={onSelect}
        // onExpand={onExpand}
        treeData={treeData}
        className="w-1/4"
      />
      <Table
        size="large"
        className="w-full"
        dataSource={dataSource}
        columns={columns}
      />
    </div>
    
  );
}

Files.propTypes = {
  courseID: PropTypes.string,
};

export default Files;