import { Modal, Collapse, Space, List } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";

import { handleDownload } from "../../scripts/downloadFile";
import { listFiles, getFileContent } from "../../scripts/getS3Data";
import { getData } from "../../scripts/jsonHelpers";
import { useUser } from "../provider/useUser";



const Modules = ({ courseID }) => {
  const moduleCount = 10; // Number of modules
  const modules = Array.from({ length: moduleCount }, (_, index) => index + 1); // Create an array of module numbers

  const { user } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalFile, setModalFile] = useState(false);
  const [gardenPic, setGardenPic] = useState();


  useEffect(() => {
    async function getUserData() {
      if (user) {
        const names = user.split(" ");
        const firstName = names[0];
        const lastName = names[1];
        const userData = await getData(
          `http://localhost:3030/students?name=${firstName}+${lastName}`,
        );

        setGardenPic(userData[0].currentGardenImage);
      }
    }

    getUserData();
  }, [user]);


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
      header: `${module.replace(".html", "")}`,
      title: `${module}`,
      description: `Module ${index + 1}`,
    }))
    : [];


  const openModuleModal = useCallback(filename => {
    setModalFile(filename);
    setIsModalVisible(true);
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    const fetchData = async filename => {
      const div = document.getElementById("modalHTML"); // Move the declaration here
      if (filename) {
        if (filename.endsWith(".png")) {
          // Remove unnecessary curly braces around filename
          div.innerHTML =
            "<img src='https://developer.ibm.com/developer/default/tutorials/wa-react-intro/images/figure1.png' alt='image' />"; // Update with the appropriate image path
        } else {
          try {
            const fileData = await getFileContent(
              `courses/${courseID}/pages/${filename}`,
            );
            if (fileData) {
              const doc = new DOMParser().parseFromString(
                fileData,
                "text/html",
              );
              div.innerHTML = doc.querySelector("body").innerHTML;
            } else {
              div.innerHTML =
                "<p>No information was found for this module. Contact your instructor for more information.</p>";
            }
          } catch (error) {
            console.error("Error fetching file content: ", error);
            div.innerHTML =
              "<p>An error occurred while fetching the content. Please try again later.</p>";
          }
        }
      }
    };

    fetchData(modalFile);
  }, [courseID, modalFile]);


  return (
    <div className="flex flex-col gap-y-4">
      <Space direction="vertical">
        {moduleList.length !== 0 &&
          modules.map(module => (
            <Collapse
              key={module}
              defaultActiveKey={["1"]}
              expandIconPosition="start"
              collapsible="header"
              items={[
                {
                  key: { module },
                  label: `Module ${module}`,
                  children: (
                    <List
                      itemLayout="horizontal"
                      dataSource={moduleList.slice(
                        (module - 1) * 2,
                        (module - 1) * 2 + 2,
                      )}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            title={
                              <a onClick={() => openModuleModal(item.title)}>
                                {item.header}
                              </a>
                            }
                            description={item.description}
                          />
                        </List.Item>
                      )}
                    />
                  ),
                },
              ]}
            />
          ))}
        <br />
        <br />
        <Collapse
          key="presentations"
          defaultActiveKey={[]}
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
                        title={
                          <a
                            onClick={() =>
                              handleDownload(
                                courseID,
                                "presentations",
                                item.title,
                              )
                            }
                          >
                            {item.title}
                          </a>
                        }
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

      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        width={1500}
        footer={null}
      >
        <div id="modalHTML"></div>
      </Modal>
      <img src={gardenPic} style={{ width: "40%", marginLeft: "auto", marginRight: "auto" }}></img>
    </div>

  );
};

Modules.propTypes = {
  courseID: PropTypes.string,
};

export default Modules;
