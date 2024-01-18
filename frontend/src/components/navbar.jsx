import { Link } from "react-router-dom"


function Navbar() {
  return (
    <div className="flex  items-center text-lg font-light text-white bg-neutral-700 justify-between px-5 py-2">

        <Link>ARTSY</Link>
        <div className="flex items-center gap-8">
        <h3>File name</h3>
        <div className="flex items-center gap-8">
            <button>Download</button>
            <h3>User</h3>
        </div>
        </div>

    </div>
  )
}

export default Navbar