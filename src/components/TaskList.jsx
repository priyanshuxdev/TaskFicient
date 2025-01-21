import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import {
  deleteTask,
  fetchWeather,
  toggleTaskCompletion,
} from "../store/taskSlice";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error, weather } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchWeather("Kanpur"));
  }, [dispatch]);

  const priorityOrder = {
    high: 3,
    medium: 2,
    low: 1,
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityA = a && a.priority ? priorityOrder[a.priority] : 0;
    const priorityB = b && b.priority ? priorityOrder[b.priority] : 0;
    return priorityB - priorityA;
  });

  const handleCheckBoxChange = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-96 animate-spin">
        <Loader2 className="h-12 w-12" />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );

  return (
    <>
      {tasks.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-xl text-gray-500">Your Tasks appear here!</p>
        </div>
      ) : (
        <div>
          <ul>
            {sortedTasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center px-2 text-lg drop-shadow-lg bg-[#f8f8f8] rounded-lg my-2"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleCheckBoxChange(task.id)}
                  />
                  <p className={task.completed ? "line-through" : ""}>
                    {task.title}
                  </p>
                </div>

                <div className="flex items-center">
                  {task.isOutdoor && weather.main && (
                    <div className="bg-slate-300 rounded-lg mr-3">
                      <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        className="h-8 sm:h-10"
                      />
                    </div>
                  )}
                  <span
                    className={`px-2 sm:px-2 rounded-[50%] sm:rounded-lg text-white ${
                      task.priority === "high"
                        ? "bg-red-400"
                        : task.priority === "medium"
                        ? "bg-yellow-400"
                        : "bg-green-400"
                    }`}
                  >
                    {" "}
                    <span className="block sm:hidden">
                      {task.priority.charAt(0).toUpperCase()}{" "}
                    </span>
                    <span className="block max-sm:hidden">
                      {task.priority.charAt(0).toUpperCase() +
                        task.priority.slice(1)}{" "}
                    </span>
                  </span>
                  <button
                    onClick={() => dispatch(deleteTask(task))}
                    className="p-2 m-2"
                  >
                    <Trash2 className="hover:fill-red-500 active:fill-red-500" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
