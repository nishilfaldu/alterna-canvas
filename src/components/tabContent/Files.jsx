import { DownloadOutlined } from "@ant-design/icons";
import { Button, Table, Tree } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { handleDownload } from "../../scripts/downloadFile";
import { listFiles } from "../../scripts/getS3Data";



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
  const [defaultExpanded, setDefaultExpanded] = useState();

  useEffect(() => {
    async function fetchData() {
      let helperData = await listFiles(courseID, null);
      setTreeData(helperData.treeData);
      setFolderToFileMap(helperData.folderToFileMap);
    }

    fetchData();
  }, [courseID]);

  useEffect(() => {
    if (folderToFileMap) {
      const folderKeys = Array.from(folderToFileMap.keys());
      setDefaultExpanded(folderKeys[0]);
      onSelect(folderKeys);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderToFileMap]);

  const onSelect = keys => {
    const dataSource = folderToFileMap.get(keys[0]).map(file => ({
      key: file,
      name: file,
      action: (
        <Button
          icon={<DownloadOutlined />}
          onClick={() => handleDownload(courseID, keys[0], file)}
        ></Button>
      ),
    }));
    setDataSource(dataSource);
  };

  return (
    <div className="flex flex-row">
      {defaultExpanded && (
        <DirectoryTree
          height={500}
          onSelect={onSelect}
          treeData={treeData}
          defaultExpandedKeys={[defaultExpanded]}
          defaultSelectedKeys={[defaultExpanded]}
          className="w-1/4"
        />
      )}
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
