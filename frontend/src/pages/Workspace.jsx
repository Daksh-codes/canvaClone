import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar/SideBar";
import CanvasWorkspace from "../components/CanvasWorkspace";
import { Provider } from "react-redux";
import { elementsStore } from "../store";
import WorkspaceNav from "../components/workspaceNav";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateElement } from "../slices/elementsSlice";
import EditsSection from "../components/EditsSection";

function Home() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [project, setProject] = useState(null);
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getElements = async () => {
      dispatch(updateElement([]));

      try {
        const res = await axios.get(
          `http://localhost:5000/api/saved/getProject/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        console.log(res.data);

        // Check if "elements" property exists before parsing
        const elements =
          res.data && res.data.elements ? JSON.parse(res.data.elements) : [];

        elements && dispatch(updateElement(elements));
        console.log(elements)
        setProject(res.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    getElements();
  }, [id, user.token, dispatch]);
  console.log(project);
  return (
    <Provider store={elementsStore}>
      <div className="overflow-hidden h-[100vh] bg-gray-300">
        <WorkspaceNav downloadUrl={downloadUrl} />
        <EditsSection
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
        />
        <SideBar
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
        />
        <CanvasWorkspace
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          setDownloadUrl={setDownloadUrl}
          height={project ? project.height : 400}
          width={project ? project.width : 600}
        />
      </div>
    </Provider>
  );
}

export default Home;
