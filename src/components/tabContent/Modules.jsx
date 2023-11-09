import { Collapse, Space, List } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { handleDownload } from "../../scripts/downloadFile";
import { listFiles } from "../../scripts/getS3Data";



const Modules = ({ courseID }) => {
  const moduleCount = 10; // Number of modules
  const modules = Array.from({ length: moduleCount }, (_, index) => index + 1); // Create an array of module numbers

  const [presentations, setPresentations] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let helperData = await listFiles(courseID, "presentations");
      setPresentations(helperData.folderToFileMap.get("presentations"));
    }

    fetchData();
  }, [courseID]);

  const presentationList = presentations
    ? presentations.map((presentation, index) => ({
      key: `${index}`,
      header: `Week ${index + 1}: ${presentation}`,
      title: `${presentation}`,
      description: `Presentation ${index + 1}`,
    }))
    : [];

  return (
    <div className="flex flex-col gap-y-4">
      <Space direction="vertical">
        {modules.map(module => (
          <Collapse
            key={module}
            defaultActiveKey={["1"]}
            expandIconPosition="start"
            collapsible="header"
          />
        ))}
        <br />
        <br />
        <Collapse
          key="presentations"
          defaultActiveKey={["1"]}
          expandIconPosition="start"
          collapsible="header"
          items={[
            {
              key: "1",
              label: "Presentations",
              children: (
                <List
                  itemLayout="horizontal"
                  dataSource={presentationList}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={<a onClick={() => handleDownload(courseID, "presentations", item.title)}>{item.header}</a>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              ),
            },
          ]}
        />
      </Space>
    </div>
  );
};

Modules.propTypes = {
  courseID: PropTypes.string,
};

export default Modules;
