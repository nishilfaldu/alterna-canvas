// import fs from "fs";
import { JSONPreset } from "lowdb/node";

// To get a JSON object from a .json file, simply import it into the file you're editing using:
//     import whatever_you_want_to_call_the_JSON_object from "the_relative_path_to_the_JSON_file";
// For example: import data from "../../data/users.json"; to import the users data into the Grades.jsx file


export const getJSONData = async fileName => {
    const db = await JSONPreset(`../data/${fileName}`, null);

    return db.data;
};

export const updateJSONData = async (fileName, updatedObject) => {
    const db = await JSONPreset(`../data/${fileName}`, null);
    db.data = updatedObject;
    db.write();
};


// export const updateJSONData = (fileName, newJSONObject) => {
//     fs.writeFile(`src/data/${fileName}`, newJSONObject, error => {
//     //     if (error) {
//     //         console.error(`Unable to update JSON file called ${fileName}: `,error);
//     //     } else {
//     //         console.log(`Successfully updated JSON object at ${fileName}`);
//     //     }
//     // });
// };
