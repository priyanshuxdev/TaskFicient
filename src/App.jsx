import Home from "./components/Home";
import { Navbar } from "./components/Navbar";
import { TaskInput } from "./components/TaskInput";
import { TaskList } from "./components/TaskList";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <div className="">
        <div className="mx-3 sm:mx-4 my-4">
          <Navbar />
        </div>
        <hr className="my-2 h-2" />
        {isAuthenticated ? (
          <div className="mx-2 my-4">
            <TaskInput />
            <TaskList />
          </div>
        ) : (
          <Home />
        )}
      </div>
    </>
  );
}

export default App;
