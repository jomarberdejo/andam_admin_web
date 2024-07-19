import Masonry from "react-layout-masonry";
import { FeedbackItem } from "./_custom_components/FeedbackItem";

import { fetchFeedbacks } from "@/common/fetchFeedbacks";

const Feedback = () => {
  const { feedbackData } = fetchFeedbacks();

  return (
    <div className="container my-8">
      <p className="text-md text-muted-foreground pb-8">
        Here are the lists of all residents who submitted feedback in the{" "}
        <span className="font-bold text-lg text-muted-foreground">ANDAM</span>{" "}
        app for Carigara, Leyte!
      </p>

      {feedbackData && feedbackData.length > 0 ? (
        <Masonry columns={{ 640: 1, 768: 2, 1024: 3, 1280: 4 }} gap={10}>
          {feedbackData.map((item, index) => (
            <FeedbackItem key={index} item={item} onClick={true} />
          ))}
        </Masonry>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg font-semibold text-gray-500">
            No feedbacks yet
          </p>
        </div>
      )}
    </div>
  );
};

export default Feedback;
