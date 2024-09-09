import React, { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({ onAdd, onCancel }) {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enterTitle = title.current.value;
    const enterDescription = description.current.value;
    const enterDueDate = dueDate.current.value;

    if (
      enterTitle.trim() === "" ||
      enterDescription.trim() === "" ||
      enterDueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    onAdd({
      title: enterTitle,
      description: enterDescription,
      dueDate: enterDueDate,
    });
  }
  return (
    <>
      <Modal ref={modal}>
        <h2 className="text-xl font-bold text-stone-500 my-4">Oops</h2>
        <p className="text-stone-400 mb-4">Error... Please chick again</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <main className="flex items-center justify-end gap-4 my-4 list-none ">
          <li>
            <button
              onClick={onCancel}
              className="text-stone-800 hover:text-stone-950 rounded-md "
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 bg-stone-800 text-stone-50 hover:text-stone-950  rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </main>
        <div>
          <Input type="text" ref={title} label={"Title"} />
          <Input ref={description} label={"Description"} textarea={true} />
          <Input type="date" ref={dueDate} label={"Due date"} />
        </div>
      </div>
    </>
  );
}
