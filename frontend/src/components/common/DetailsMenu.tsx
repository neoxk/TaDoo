import { forwardRef } from "preact/compat";
import { Task } from "../../models/Task.ts";

interface DetailsMenuProps {
  task: Task;
}

export const DetailsMenu = forwardRef<HTMLDialogElement, DetailsMenuProps>(
  ({ task }, ref) => {

    const closeModal = () => {
      if (ref && "current" in ref && ref.current) {
        ref.current.close();
      }
    };

    const handleDownload = () => {

    }

    const handleAddAttachment = () => {

    }

    return (
      <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-6 rounded-lg shadow-lg bg-white">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <h3 className="text-lg font-bold text-gray-800">{task.name}</h3>
            <button
                className="text-gray-500 hover:text-gray-800 focus:outline-none"
                onClick={closeModal}
                aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="mb-6">
            {task.has_file ? (
                <p className="text-gray-600 text-center mb-4">
                  Attach files to your task and keep all your essential information organized in one place.
                </p>
            ) : (
                <p className="text-gray-600 text-center mb-4">
                  Download files attached to your task and review all your essential information.
                </p>
            )}
          </div>
          <div className="flex justify-center">
            <button
                className="btn bg-purple-500 text-white hover:bg-purple-600 transition rounded-md px-4 py-2 mt-2 mb-5"
                onClick={task.has_file ? (handleDownload) : handleAddAttachment}
            >
              {task.has_file ? "Download Attachment" : "Add Attachment"}
            </button>
          </div>

        <div className="flex justify-end border-t pt-4">
          <button
              className="btn bg-gray-300 text-gray-800 hover:bg-gray-400 transition rounded-md px-4 py-2"
              onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
  </dialog>
  )
    ;
  }
);
