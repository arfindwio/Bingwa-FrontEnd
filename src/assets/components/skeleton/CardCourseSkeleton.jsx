// Skeleton Component
import Skeleton from "react-loading-skeleton";

const CardCoursesSkeleton = () => {
  const loadCards = Array(14).fill(null);

  return loadCards.map((_, i) => (
    <div className="flex flex-col gap-2" key={i}>
      <Skeleton borderRadius={"1rem"} height={130} />
      <Skeleton borderRadius={"0.75rem"} height={20} />
    </div>
  ));
};
export default CardCoursesSkeleton;
