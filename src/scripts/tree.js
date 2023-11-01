
export const createFolderToFileMap = fileList => {
    const map = new Map();

    for(let i = 0; i < fileList.length; i++) {
        const partPaths = fileList[i].split("/");
        const folderName = partPaths[partPaths.length - 2];
        const fileName = partPaths[partPaths.length - 1];

        if(map.has(folderName)) {
            map.get(folderName).push(fileName);
        } else if (!map.has(folderName)) {
            map.set(folderName, []);
        }
    }

    return map;
};

export function createTreeStructure(folderToFileMap) {
    let treeData = [];

    for (let [folderName, fileList] of folderToFileMap) {
        treeData.push({
            title: folderName,
            key: folderName,
            children: 
                fileList.map(file => ({
                    title: file,
                    key: `${folderName}-${file}`,
                    isLeaf: true,
                })),
        });
    }

    return treeData;
}