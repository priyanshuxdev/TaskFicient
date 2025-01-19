import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";
import { PlusCircle } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { weatherMessages } from "@/data/weatherMessages";

export const TaskInput = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isOutdoor, setIsOutdoor] = useState(false);
  const weather = useSelector((state) => state.tasks.weather);
  const dispatch = useDispatch();

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title: task,
      completed: false,
      priority,
      isOutdoor,
    };
    if (!task) return toast.error("Please enter a task!");
    dispatch(addTask(newTask));
    if (isOutdoor) {
      if (!weather) {
        return toast.error("Please wait while we fetch the weather data!");
      }
      const weatherCondition = weather.weather[0].main;
      const message = weatherMessages[weatherCondition];

      if (message) {
        if (["Rain", "Snow", "Thunderstorm"].includes(weatherCondition)) {
          return toast.error(message);
        } else {
          return toast.success(message);
        }
      }
    }
    setTask("");
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-gradient-to-b from-neutral-100 to-neutral-400 px-2 py-4 rounded-lg drop-shadow-lg">
        <form onSubmit={handleAddTask} className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Add new task here..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="p-2 max-w-screen-md w-[70%] sm:max-w-screen-2xl sm:w-full focus:outline-none rounded-lg"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="p-2 border-2 rounded-lg focus:outline-none"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={isOutdoor}
                onCheckedChange={() => setIsOutdoor(!isOutdoor)}
              />
              <span className="text-slate-700">Outdoor Task</span>
            </div>
            <button className="bg-slate-900 text-white p-2 rounded-lg flex items-center space-x-2">
              <PlusCircle className="inline-block" />
              <span>New Task</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
