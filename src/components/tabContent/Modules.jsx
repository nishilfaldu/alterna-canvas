import { Collapse, Space, List } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";

import { handleDownload } from "../../scripts/downloadFile";
import { listFiles } from "../../scripts/getS3Data";



const Modules = ({ courseID }) => {
  const moduleCount = 10; // Number of modules
  const modules = Array.from({ length: moduleCount }, (_, index) => index + 1); // Create an array of module numbers

  const [presentations, setPresentations] = useState([]);
  useEffect(() => {
    async function fetchPresentationData() {
      let helperData = await listFiles(courseID, "presentations");
      setPresentations(helperData.folderToFileMap.get("presentations"));
    }

    fetchPresentationData();
  }, [courseID]);

  const presentationList = presentations
    ? presentations.map((presentation, index) => ({
      key: `${index}`,
      header: `Week ${index + 1}: ${presentation}`,
      title: `${presentation}`,
      description: `Presentation ${index + 1}`,
    }))
    : [];

  const [moduleData, setModuleData] = useState([]);
  useEffect(() => {
    async function fetchModuleData() {
      let helperData = await listFiles(courseID, "pages");
      setModuleData(helperData.folderToFileMap.get("pages"));
    }

    fetchModuleData();
  }, [courseID]);

  const moduleList = moduleData
    ? moduleData.map((module, index) => ({
      key: `${index}`,
      header: `Module ${index + 1}: ${module}`,
      title: `${module}`,
      description: `Module ${index + 1}`,
    }))
    : [];

  const openSubmissionModal = useCallback((title, description) => {
    { title; }
    { description; }
  });

  return (
    <div className="flex flex-col gap-y-4">
      <Space direction="vertical">
        {moduleList.length !== 0 && modules.map(module => (
          <Collapse
            key={module}
            defaultActiveKey={["1"]}
            expandIconPosition="start"
            collapsible="header"
            items={[
              {
                key: { module },
                label: `Module ${module}`,
                children:
                  <List
                    itemLayout="horizontal"
                    dataSource={moduleList.slice((module - 1) * 2, (module - 1) * 2 + 2)}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          // eslint-disable-next-line max-len
                          title={<a onClick={() => openSubmissionModal(item.title, item.description)}>{item.title}</a>}
                          description={item.description}
                        />
                      </List.Item>
                    )}
                  />,
              },
            ]}
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
                        title={<a onClick={() => handleDownload(courseID, "presentations", item.title)}>{item.title}</a>}
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
