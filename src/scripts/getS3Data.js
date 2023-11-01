import AWS from "aws-sdk";
import "dotenv/config";



AWS.config.update({
  // eslint-disable-next-line no-undef
  accessKeyId: process.env.VITE_ACCESS_KEY_ID,
  // eslint-disable-next-line no-undef
  secretAccessKey: process.env.VITE_SECRET_ACCESS_KEY,
  // eslint-disable-next-line no-undef
  region: process.env.VITE_REGION,
});

const s3 = new AWS.S3();

export async function listFiles(courseName, folderType) {
  const params = {
    // eslint-disable-next-line no-undef
    Bucket: process.env.VITE_BUCKET_NAME,
    Prefix: `courses/${courseName}/${folderType}/`, // Optional: Only list files in a specific directory
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const files = data.Contents.map(file => file.Key);
    console.log("Files:", files);
  } catch (error) {
    console.error("Error listing files:", error);
  }
}

// usage of function
// listFiles("computer_graphics", "presentations");