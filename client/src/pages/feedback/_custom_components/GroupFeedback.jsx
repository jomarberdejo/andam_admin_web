import Masonry from "react-layout-masonry";
import { useParams } from "react-router-dom";
import { FeedbackItem } from "./FeedbackItem";
import { fetchGroupFeedbacks } from "@/common/fetchGroupFeedback";

const GroupFeedback = () => {
  const { id } = useParams();
  const { feedbackData } = fetchGroupFeedbacks(id);

  return (
    <div className="container my-8">
      <p className="text-md text-muted-foreground pb-8">
        Here are the lists of all the feedback of specific registered resident
        in the{" "}
        <span className="font-bold text-lg text-muted-foreground">ANDAM</span>{" "}
        app for Carigara, Leyte!
      </p>

      <Masonry columns={{ 640: 1, 768: 2, 1024: 3, 1280: 4 }} gap={10}>
        {feedbackData?.map((item) => {
          console.log(item);
          return <FeedbackItem key={item.id} item={item} />;
        })}
      </Masonry>
    </div>
  );
};

export default GroupFeedback;
