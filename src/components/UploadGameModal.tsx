import React, { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import { FaInfoCircle } from "react-icons/fa";
import { useToast } from "./Toast";

type UploadGameModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onRequireLogin?: () => void;
};

type FlowStep = "rules" | "form" | "success";
type UploadCategory = "play" | "skill";

const arbitraryRules = [
  "Only upload code you own the rights to share.",
  "Bundle all assets (images, audio, JSON) inside the same folder.",
  "Include clear instructions in a README for players.",
  "Keep total upload size under 200MB for faster publishing.",
  "Skill games are manually reviewed before they go live.",
];

const UploadGameModal: React.FC<UploadGameModalProps> = ({
  isOpen,
  onClose,
  onRequireLogin,
}) => {
  const toast = useToast();
  const [step, setStep] = useState<FlowStep>("rules");
  const [gameName, setGameName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<UploadCategory>("play");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<string>("");
  const [uploadToastId, setUploadToastId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep("rules");
      setGameName("");
      setDescription("");
      setCategory("play");
      setSelectedFiles([]);
      setError(null);
      setUploading(false);
    }
  }, [isOpen]);

  const hasFiles = useMemo(() => selectedFiles.length > 0, [selectedFiles]);

  const totalFileSize = useMemo(() => {
    return selectedFiles.reduce((total, file) => total + file.size, 0);
  }, [selectedFiles]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles(files);
  };

const handleUpload = async () => {
  const fakeLoggedIn = true;

  if (!fakeLoggedIn) {
    setError("Please log in to upload your game.");
    toast.error("Please log in to upload your game");
    onRequireLogin?.();
    return;
  }

  if (!gameName.trim()) {
    setError("Add a game name before uploading.");
    toast.error("Please add a game name");
    return;
  }

  if (!hasFiles) {
    setError("Attach at least one file or folder.");
    toast.error("Please select files to upload");
    return;
  }

  setUploading(true);
  setError(null);
  setUploadProgress(0);

  const toastId = toast.loading("Starting upload...");
  setUploadToastId(toastId);

  try {
    const totalFiles = selectedFiles.length;

    // fake upload simulation
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      setCurrentFile(file.name);

      const progress = Math.round(((i + 1) / totalFiles) * 100);

      setUploadProgress(progress);

      toast.updateToast(
        toastId,
        `Uploading ${i + 1}/${totalFiles}: ${file.name}`,
        "loading"
      );

      // fake delay
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    // fake save to localStorage
    const uploadedGame = {
      id: Date.now(),
      name: gameName.trim(),
      description: description.trim(),
      category: category === "skill" ? "Skill" : "Play",
      status: category === "skill"
        ? "pending_review"
        : "live",

      files: selectedFiles.map((file) => ({
        name: file.name,
        size: file.size,
      })),

      createdAt: new Date().toISOString(),
    };

    const existingGames =
      JSON.parse(localStorage.getItem("quilpana-user-games") || "[]");

    existingGames.push(uploadedGame);

    localStorage.setItem(
      "quilpana-user-games",
      JSON.stringify(existingGames)
    );

    toast.dismiss(toastId);

    toast.success("Game uploaded successfully!");

    setStep("success");

  } catch (err) {
    console.error("Upload failed", err);

    const errorMessage =
      err instanceof Error
        ? err.message
        : "Something went wrong while uploading. Please try again.";

    setError(errorMessage);

    if (uploadToastId) {
      toast.dismiss(uploadToastId);
    }

    toast.error(errorMessage);

  } finally {
    setUploading(false);
    setUploadProgress(0);
    setCurrentFile("");
    setUploadToastId(null);
  }
};

  const renderRules = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Before you upload</h2>
        <p className="text-gray-600">Please follow these quick guidelines.</p>
      </div>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {arbitraryRules.map((rule, idx) => (
          <li key={idx}>{rule}</li>
        ))}
      </ul>
      <div className="flex justify-end space-x-3">
        <button
          className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={() => setStep("form")}
        >
          OK, continue
        </button>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Upload your build</h2>
        <p className="text-gray-600">Add your files and basic details.</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-800">Game name</label>
        <input
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          placeholder="e.g., Neon Runner"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-800">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What should players know before they start?"
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
        <div>
          <p className="text-sm font-semibold text-gray-800">Play vs Skill</p>
          <p className="text-xs text-gray-500">
            Choose how you want the game to be listed.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <div className="text-gray-500 cursor-help hover:text-gray-700 transition-colors">
              <FaInfoCircle size={18} />
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
              Skill games are manually reviewed before they are published.
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <button
              className={`px-3 py-1 text-sm rounded-full ${
                category === "play"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700"
              }`}
              onClick={() => setCategory("play")}
            >
              Play
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full ${
                category === "skill"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700"
              }`}
              onClick={() => setCategory("skill")}
            >
              Skill
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-800">
          Upload files or folders
        </label>
        <div className="border border-dashed border-indigo-300 rounded-lg p-4 text-center bg-indigo-50">
          <input
            type="file"
            multiple
            // Allow folder selection in Chromium-based browsers
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            webkitdirectory="true"
            directory=""
            onChange={handleFileChange}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
          />
          <p className="text-xs text-gray-600 mt-2">
            You can choose a folder to upload everything inside it.
          </p>
          {hasFiles && (
            <p className="text-xs text-gray-500 mt-2">
              Total size: {formatFileSize(totalFileSize)}
            </p>
          )}
        </div>
        {hasFiles && (
          <div className="max-h-32 overflow-y-auto rounded-md border border-gray-200 bg-white p-3 text-left">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              Selected ({selectedFiles.length} files)
            </p>
            <ul className="text-xs text-gray-700 space-y-1">
              {selectedFiles.slice(0, 10).map((file, idx) => (
                <li key={`${file.name}-${idx}`} className="truncate">
                  {(file as any).webkitRelativePath || file.name}
                </li>
              ))}
              {selectedFiles.length > 10 && (
                <li className="text-gray-500 italic">
                  ... and {selectedFiles.length - 10} more files
                </li>
              )}
            </ul>
          </div>
        )}
        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-700">
              <span>{currentFile || "Uploading..."}</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-between items-center">
        <button
          className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100"
          onClick={() => setStep("rules")}
          disabled={uploading}
        >
          Back
        </button>
        <div className="space-x-3">
          <button
            className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100"
            onClick={onClose}
            disabled={uploading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="space-y-5 text-center">
      <h2 className="text-2xl font-bold text-gray-900">All set!</h2>
      <p className="text-gray-700">
        Your game files are saved. A new card will appear for everyone once the
        upload finishes processing.
      </p>
      <button
        className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="max-w-2xl"
    >
      {step === "rules" && renderRules()}
      {step === "form" && renderForm()}
      {step === "success" && renderSuccess()}
    </Modal>
  );
};

export default UploadGameModal;

