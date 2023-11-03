import { s3Obj } from "../storage/s3";



export function handleDownload(courseName, folderType, fileName) {
    const params = {
      Bucket: import.meta.env.VITE_BUCKET_NAME,
      Key: `courses/${courseName}/${folderType}/${fileName}`,
    };

    function downloadBlob(blob, fileName) {
        // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
        const blobUrl = URL.createObjectURL(blob);
        // Create a link element
        const link = document.createElement("a");
        // Set link's href to point to the Blob URL
        link.href = blobUrl;
        link.download = fileName;
        // Append link to the body
        document.body.appendChild(link);
        // Dispatch click event on the link
        // This is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
          }),
        );
  
        // Remove link from body
        document.body.removeChild(link);
      }

      s3Obj.getObject(params, (err, data) => {
        if (err) {
          console.log(err, err.stack);
        } else {
            // console.log("data", data);
          let blob = new Blob([data.Body.toString()], {
            type: data.ContentType,
          });
          downloadBlob(blob, fileName);
        }
      });
}