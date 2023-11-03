import { createFolderToFileMap, createTreeStructure } from "./tree";
import { s3Obj } from "../storage/s3";



export async function listFiles(courseID, folderType) {
  const params = {
    Bucket: import.meta.env.VITE_BUCKET_NAME,
    Prefix: folderType ? `courses/${courseID}/${folderType}/` : `courses/${courseID}/`, // Optional: Only list files in a specific directory
  };

  try {
    const data = await s3Obj.listObjectsV2(params).promise();
    const files = data.Contents.map(file => file.Key);

    const folderToFileMap = createFolderToFileMap(files);
    const treeData = createTreeStructure(folderToFileMap);


    return { treeData: treeData, folderToFileMap: folderToFileMap };
  } catch (error) {
    console.error("Error listing files:", error);
  }
}