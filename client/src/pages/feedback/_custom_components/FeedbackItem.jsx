import { useNavigate } from "react-router-dom";

export const FeedbackItem = ({ item, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(navigate(`/feedback/${item.residentId}`));
    }
  };

  return (
    <div
      className="group bg-muted rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">{item.Resident.fullName}</h3>
          {item.Resident.imageIdentityUrl && (
            <img
              src={item?.Resident.imageIdentityUrl}
              alt={`${item.fullName}'s Avatar`}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
        </div>
        <div className="border border-b-[0.5px] border-gray-500 my-2" />
        <p>{item.feedbackDetail}</p>
        <small className="text-sm text-gray-500 block mt-2">
          {item.createdAt}
        </small>
      </div>
    </div>
  );
};
