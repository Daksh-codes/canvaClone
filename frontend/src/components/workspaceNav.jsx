import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function WorkspaceNav({ downloadUrl }) {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const elements = useSelector((state) => state.elements.elements);
  console.log(elements)

  const saveProject = async () => {
console.log(elements)
    const res = await axios.put(
      `http://localhost:5000/api/saved/update/${id}`,
      {elements : JSON.stringify(elements)},
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(res);
  };

  return (
    <div className="flex  items-center text-lg font-light text-white bg-neutral-700 justify-between px-5 py-2">
      <Link to={"/"}>ARTSY</Link>
      <div className="flex items-center gap-8">
        {/* <h3>Untitled</h3> */}
        <div className="flex items-center gap-8">
          <button onClick={() => saveProject()}>Save</button>
          <button className="border-[1px] px-2 bg-orange-500">
            <a href={downloadUrl} download>
              Download
            </a>
          </button>
          <h3 className="flex items-center gap-1">
            <span class="material-symbols-outlined">account_circle</span>
            {user ? user.firstName : "user"}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceNav;
