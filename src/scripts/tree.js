export const createFolderToFileMap = fileList => {
  const map = new Map();

  for (let i = 0; i < fileList.length; i++) {
    const partPaths = fileList[i].split("/");
    const folderName = partPaths[partPaths.length - 2];
    const fileName = partPaths[partPaths.length - 1];

    if (map.has(folderName)) {
      map.get(folderName).push(fileName);
    } else if (!map.has(folderName)) {
      map.set(folderName, []);
    }
  }

  return map;
};

export function createTreeStructure(folderToFileMap) {
  let treeData = [];

  // eslint-disable-next-line no-unused-vars
  for (let [folderName, fileList] of folderToFileMap) {
    if (folderName !== "metadata") {
      treeData.push({
        title:
          folderName === "course_info"
            ? "Course Info"
            : folderName.charAt(0).toUpperCase() + folderName.slice(1),
        key: folderName,
        children: [],
      });
    }
  }

  return treeData;
}
