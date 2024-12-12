import { forwardRef } from "preact/compat";
import { useState, useEffect } from "preact/hooks";
import { Tasklist } from "../../models/Tasklist.ts";

interface TimeAnalysisMenuProps {
    tasklist: Tasklist;
}

export const TimeAnalysisMenu = forwardRef<HTMLDialogElement, TimeAnalysisMenuProps>(
    ({ tasklist }, ref) => {

        const [averageTime, setAverageTime] = useState("Loading...");
        const [donePercentage, setDonePercentage] = useState("Loading...");

        const closeModal = () => {
            if (ref && "current" in ref && ref.current) {
                ref.current.close();
            }
        };

        const fetchPercentage = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/tasklist/${tasklist._tasklist_id}/done`, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error("Failed to get percentage.");
                }

                const data = await response.text();
                setDonePercentage(`${data}%`);
            } catch (error) {
                console.error("Error showing percentage:", error);
                setDonePercentage("Error");
            }
        }

        const fetchTime = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/tasklist/${tasklist._tasklist_id}/time`, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error("Failed to get percentage.");
                }

                const data = await response.text();
                setAverageTime(data);
            } catch (error) {
                console.error("Error showing percentage:", error);
                setAverageTime("Error");
            }
        }

        useEffect(() => {
            fetchPercentage();
            fetchTime();
        }, [tasklist]);

        return (
            <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box p-6 rounded-lg shadow-lg bg-white">
                    <div className="flex items-center justify-between border-b pb-4 mb-4">
                        <h3 className="text-lg font-bold text-gray-800">{tasklist.name}</h3>
                        <button
                            className="text-gray-500 hover:text-gray-800 focus:outline-none"
                            onClick={closeModal}
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="mb-6">
                        <p className="text-gray-600 text-center mb-4">
                            View the average time you needed to complete the tasks and percentage of done tasks.
                        </p>
                    </div>
                    <div className="">
                        <p className="mb-4">
                            Average Time:
                            <span className="bg-purple-600 text-white py-1 px-2 mx-2 border rounded">
                                {averageTime}
                            </span>
                        </p>
                        <p className="mb-4">
                            Percentage of Done Tasks:
                            <span className="bg-purple-600 text-white py-1 px-2 mx-2 border rounded">
                                {donePercentage}
                            </span>
                        </p>
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
