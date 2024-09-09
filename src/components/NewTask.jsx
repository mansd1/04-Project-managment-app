import React, { useState } from "react";

export default function NewTask({ onAdd }) {
  const [enterTask, setEnterTask] = useState(""); // Initialize with an empty string

  function handleChange(e) {
    setEnterTask(e.target.value);
  }

  function handleClick() {
    if (enterTask.trim() === "") {
      return;
    }
    onAdd(enterTask);
    setEnterTask(""); // Clear input after adding the task
  }

  return (
    <div className="flex items-center gap-4">
      <input
        onChange={handleChange}
        value={enterTask}
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        type="text"
      />
      <button
        onClick={handleClick}
        className="text-stone-700 hover:text-stone-950"
      >
        Add Task
      </button>
    </div>
  );
}
