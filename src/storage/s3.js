import AWS from "aws-sdk";



AWS.config.update({
    accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
    region: import.meta.env.VITE_REGION,
});

export const s3Obj = new AWS.S3({
    signatureVersion: "v4",
}); 