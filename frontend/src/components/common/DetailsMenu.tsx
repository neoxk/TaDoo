import { forwardRef } from "preact/compat";
import { Task } from "../../models/Task.ts";
import { useRef } from "react";
import { useState } from "preact/hooks";

interface DetailsMenuProps {
    task: Task;
}

export const DetailsMenu = forwardRef<HTMLDialogElement, DetailsMenuProps>(
    ({ task }, ref) => {

        const fileInputRef = useRef<HTMLInputElement>(null);
        const [hasFile, setHasFile] = useState(task.has_file);

        const closeModal = () => {
            if (ref && "current" in ref && ref.current) {
                ref.current.close();
            }
        };

        const handleDownload = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/task/${task._task_id}/file`, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error("Failed to download file");
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = task.file_path || "downloaded_file";
                a.click();
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Error downloading file:", error);
            }
        };
        const handleFileExplorer = () => {
            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
        };

        const handleAddAttachment = async (event: Event) => {
            const input = event.target as HTMLInputElement;
            if (!input.files || input.files.length === 0) return;

            const file = input.files[0];
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch(`http://localhost:8080/api/task/${task._task_id}/file`, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Failed to upload file");
                }

                setHasFile(1);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        };

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
                        {hasFile ? (
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
                        {hasFile ? (
                            <button
                                className="btn bg-purple-500 text-white hover:bg-purple-600 transition rounded-md px-4 py-2 mt-2 mb-5"
                                onClick={handleDownload}
                            >
                                Download Attachment
                            </button>
                        ) : (
                            <button
                                className="btn bg-purple-500 text-white hover:bg-purple-600 transition rounded-md px-4 py-2 mt-2 mb-5"
                                onClick={handleFileExplorer}
                            >
                                Add Attachment
                            </button>
                        )}
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleAddAttachment}
                    />

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
