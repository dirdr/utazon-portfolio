import { VideoShowcaseData } from "../../types/showcase";
import { InteractiveVideoPlayer } from "../common/InteractiveVideoPlayer";
import { SHOWCASE_STYLES } from "../../constants/showcaseStyles";
import { cn } from "../../utils/cn";
import { getVideoUrl } from "../../utils/videoUrl";

interface VideoShowcaseProps {
  data: VideoShowcaseData;
  className?: string;
  border?: boolean;
}

export const VideoShowcase = ({
  data,
  className,
  border = false,
}: VideoShowcaseProps) => {
  const { video, id, aspectRatio } = data;
  const videoUrl = getVideoUrl(video.src);
  const isVertical = aspectRatio === "9/16";

  return (
    <div
      className={cn(
        "w-full",
        isVertical && "max-w-2xl mx-auto",
        className
      )}
      data-id={id}
    >
      <div
        className={cn(
          "w-full overflow-hidden",
          aspectRatio ? `aspect-[${aspectRatio}]` : "aspect-video",
          border && SHOWCASE_STYLES.borderRadius,
          border && SHOWCASE_STYLES.border,
        )}
      >
        <InteractiveVideoPlayer
          src={videoUrl}
          width="100%"
          height="100%"
          controls={true}
          startTime={video.startTime}
        />
      </div>
    </div>
  );
};
