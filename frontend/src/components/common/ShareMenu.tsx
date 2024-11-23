import { forwardRef, useState } from "preact/compat";
import { Task } from "../../models/Task.ts";

interface ShareMenuProps {
    task: Task;
}

export const ShareMenu = forwardRef<HTMLDialogElement, ShareMenuProps>(({ task }, ref) => {
    const [url] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"); // + setUrl
    const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);

    const closeModal = () => {
        if (ref && "current" in ref && ref.current) {
            ref.current.close();
        }
    };

    const generateQRCode = () => {
        setQrCodeImage(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
        );
    };

    return (
        <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box p-6 rounded-lg shadow-lg bg-white">
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{task.name}</h3>
                    <button className="text-gray-500 hover:text-gray-800 focus:outline-none" onClick={closeModal} aria-label="Close">
                        ✕
                    </button>
                </div>

                <div className="mb-6">
                    <p className="text-gray-600 text-center mb-4">
                        Share this task with your team or friends by using the URL or generating a QR code.
                    </p>

                    <div className="mb-4">
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                            URL:
                        </label>
                        <input type="text" id="url" value={url} readOnly className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                    </div>

                    <div className="flex justify-center">
                        <button className="btn bg-purple-500 text-white hover:bg-purple-600 transition rounded-md px-4 py-2 mt-2" onClick={generateQRCode}>
                            Generate QR Code
                        </button>
                    </div>

                    {qrCodeImage && (
                        <div className="mt-6 text-center">
                            <h4 className="font-semibold text-gray-800 mb-2">QR Code:</h4>
                            <img src={qrCodeImage} alt="Generated QR Code" className="mx-auto w-64 h-64 border border-gray-300 shadow-sm rounded-md" />
                        </div>
                    )}
                </div>

                <div className="flex justify-end border-t pt-4">
                    <button className="btn bg-gray-300 text-gray-800 hover:bg-gray-400 transition rounded-md px-4 py-2" onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    );
});
