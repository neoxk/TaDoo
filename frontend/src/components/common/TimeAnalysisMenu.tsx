import { forwardRef } from "preact/compat";
import { Tasklist } from "../../models/Tasklist.ts";

interface TimeAnalysisMenuProps {
    tasklist: Tasklist;
}

export const TimeAnalysisMenu = forwardRef<HTMLDialogElement, TimeAnalysisMenuProps>(
    ({ tasklist }, ref) => {

        const closeModal = () => {
            if (ref && "current" in ref && ref.current) {
                ref.current.close();
            }
        };

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
                        {/*<button
                            className="btn bg-purple-500 text-white hover:bg-purple-600 transition rounded-md px-4 py-2 mt-2 mb-5"

                        >
                            Download Attachment
                        </button>*/}
                        <p className="mb-4">
                            Average Time:
                            <span className="bg-purple-600 text-white py-1 px-2 mx-2 border rounded">
                                5 hours 15 minutes
                            </span>
                        </p>
                        <p className="mb-4">
                            Percentage of Done Tasks:
                            <span className="bg-purple-600 text-white py-1 px-2 mx-2 border rounded">
                                80%
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
