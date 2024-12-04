import { memo, useState } from "react";
import useStore from "../store/useStore";
import Modal from "./Modal";
import Toast from "./Toast"; // 


interface PostCardProps {
  id: number;
  author: string;
  content: string;
  image: string | null;
  liked: boolean;
  bookmarked: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  author,
  content,
  image,
  liked,
  bookmarked,
}) => {
  const toggleLike = useStore((state) => state.toggleLike);
  const toggleBookmark = useStore((state) => state.toggleBookmark);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null); 


  const reportReasons = [
    "Spam",
    "Harassment",
    "False Information",
    "Inappropriate Content",
  ];

  const handleReportSubmit = () => {
    if (selectedReasons.length === 0) {
      setError("Please select at least one reason.");
      return;
    }
    if (!description.trim()) {
      setError("Description is required.");
      return;
    }

    console.log("Report Submitted:", { id, selectedReasons, description });

    setToastMessage("Your report has been submitted successfully!");

    setIsReportModalOpen(false);
    setSelectedReasons([]);
    setDescription("");
    setError(null);
  };

  const handleBookmarkItem = (id: number, bookmarked: boolean) => {    
    toggleBookmark(id);
    if (!bookmarked) setToastMessage("bookmarked successfully!");
    else setToastMessage("remove bookmarke successfully!");
  };

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-4 mb-4">
      <h2 className="font-bold text-lg">{author}</h2>
      <p className="my-2">{content}</p>
      {image ? (
        <img
          src={image}
          alt="Post"
          className="w-full h-96 object-contain mb-4 rounded"
        />
      ) : (
        <div className="w-full h-96 bg-gray-300 rounded mb-4" />
      )}
      <button
        onClick={() => toggleLike(id)}
        className={`px-4 py-2 rounded ${
          liked
            ? "bg-red-500 text-white"
            : "bg-gray-200 dark:bg-gray-600 text-black"
        }`}
      >
        {liked ? "Unlike" : "Like"}
      </button>
      <button
        onClick={() => handleBookmarkItem(id, bookmarked)}        
        className={`px-4 py-2 ml-4 rounded ${
          bookmarked
            ? "bg-yellow-500 text-white"
            : "bg-gray-200 dark:bg-gray-600 text-black"
        }`}
      >
        {bookmarked ? "Remove Bookmark" : "Add Bookmark"}
      </button>
      <button
        onClick={() => setIsReportModalOpen(true)}
        className="px-4 py-2 ml-4 rounded bg-blue-500 text-white"
      >
        Report
      </button>

      <Modal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Report Post</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form>
          <fieldset>
            <legend className="text-gray-700 dark:text-gray-300 mb-2">
              Select reasons:
            </legend>
            {reportReasons.map((reason) => (
              <div key={reason} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={reason}
                  checked={selectedReasons.includes(reason)}
                  onChange={() => toggleReason(reason)}
                  className="mr-2"
                />
                <label
                  htmlFor={reason}
                  className="text-gray-700 dark:text-gray-300"
                >
                  {reason}
                </label>
              </div>
            ))}
          </fieldset>
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <div className="flex justify-between mt-4">
 
            <button
              type="button"
              onClick={handleReportSubmit}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setIsReportModalOpen(false)} 
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
};

export default memo(PostCard);
