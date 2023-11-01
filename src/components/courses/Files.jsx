import { Tree } from "antd";
import AWS from "aws-sdk";
import { useState } from "react";

import { createFolderToFileMap, createTreeStructure } from "../../scripts/tree";



const { DirectoryTree } = Tree;

export function Files(props) {
  const [treeData, setTreeData] = useState();

  AWS.config.update({
    // eslint-disable-next-line no-undef
    accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
    // eslint-disable-next-line no-undef
    secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
    // eslint-disable-next-line no-undef
    region: import.meta.env.VITE_REGION,
  });

  async function listFiles(courseName, folderType) {
    const s3 = new AWS.S3();
    const params = {
      // eslint-disable-next-line no-undef
      Bucket: import.meta.env.VITE_BUCKET_NAME,
      Prefix: folderType ? `courses/${courseName}/${folderType}/` : `courses/${courseName}/`, // Optional: Only list files in a specific directory
    };
  
    try {
      const data = await s3.listObjectsV2(params).promise();
      const files = data.Contents.map(file => file.Key);
      console.log(files);
      const folderToFileMap = createFolderToFileMap(files);
      const treeData = createTreeStructure(folderToFileMap);
      setTreeData(treeData);

      return treeData;
    } catch (error) {
      console.error("Error listing files:", error);
    }
  }

  listFiles(props.courseName, null);


  const onSelect = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };
  const onExpand = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  return (
    <DirectoryTree
      multiple
      defaultExpandAll
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
    />
  );
}