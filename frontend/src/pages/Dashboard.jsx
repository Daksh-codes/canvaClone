import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = useSelector((state) => state.user);

  const [name, setName] = useState("untitled");
  const [width, setWidth] = useState(800);
  const [height, setHeigth] = useState(600);
  const navigate = useNavigate();
  const [savedProjects, setSavedProject] = useState();

  useEffect(() => {
    const getProjects = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/saved/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(res);
      setSavedProject(res.data);
    };
    getProjects();
  }, []);

  const goToProject = (e , id) => {
    e.preventDefault();
    navigate(`/workspace/${id}`);
  };

  const createProject = async (e) => {
    e.preventDefault();
    console.log({ name, height, width });
    const res = await axios.post(
      "http://localhost:5000/api/saved/create",
      { userId: user._id, projectName: name, height, width },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (res.status === 201) {
      navigate(`/workspace/${res.data._id}`);
    }
    console.log(res);
  };

  return (
    <div>
      <Navbar />
      <form className="flex flex-col m-12 gap-4">
        <h3>Enter Data for new Project</h3>
        <div className="flex items-center gap-4">
          <label>Name : </label>
          <input
            className="border-[1px] border-neutral-600"
            type="text"
            name=""
            value={name}
            id=""
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <label>Width: </label>
          <input
            className="border-[1px] border-neutral-600"
            type="number"
            name=""
            value={width}
            id=""
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <label>Height: </label>
          <input
            className="border-[1px] border-neutral-600"
            type="number"
            name=""
            value={height}
            onChange={(e) => setHeigth(e.target.value)}
            id=""
          />
        </div>
        <button
          className="w-max bg-orange-400 px-4  py-2 text-light"
          onClick={(e) => createProject(e)}
        >
          Create Project
        </button>
      </form>

      <div className="m-12 border-t-2 border-neutral-600">
        {savedProjects ? (
          <div className="mx-2">
            <h3>All Saved Projects</h3>
            {savedProjects.map((project) => {
                console.log()
              return (
                <ol
                  className="hover:bg-gray-600"
                  onClick={(e) => goToProject(e , project._id)}
                >
                  <li className="list-disc flex items-center gap-4">
                    {project.projectName} {project.createdAt.split("T")[0]}
                  </li>
                </ol>
              );
            })}
          </div>
        ) : (
          <h3>No saved Projects </h3>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
