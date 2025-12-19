import { VideoGridShowcaseData } from "../../types/showcase";
import { SHOWCASE_STYLES } from "../../constants/showcaseStyles";
import { cn } from "../../utils/cn";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import { usePresignedVideoUrl } from "../../hooks/usePresignedVideoUrl";

interface VideoGridShowcaseProps {
  data: VideoGridShowcaseData;
  className?: string;
  border?: boolean;
}

interface GridVideoItemProps {
  src: string;
  title?: string;
  border: boolean;
}

const GridVideoItem = ({ src, title, border }: GridVideoItemProps) => {
  const { url: videoUrl, loading } = usePresignedVideoUrl(src);

  return (
    <figure className="w-full">
      <div
        className={cn(
          "w-full aspect-video overflow-hidden relative",
          border && SHOWCASE_STYLES.borderRadius,
          border && SHOWCASE_STYLES.border,
        )}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="w-10 h-10 border-3 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
        {videoUrl && (
          <ReactPlayer
            src={videoUrl}
            playing={true}
            muted={true}
            loop={true}
            controls={false}
            playsInline={true}
            width="100%"
            height="100%"
            className="react-player"
            style={{
              objectFit: "cover" as const,
            }}
          />
        )}
      </div>
      {title && <figcaption className="sr-only">{title}</figcaption>}
    </figure>
  );
};

export const VideoGridShowcase = ({
  data,
  className,
  border = false,
}: VideoGridShowcaseProps) => {
  const { t } = useTranslation();
  const { videos } = data;

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
        {videos.map((video, index) => (
          <GridVideoItem
            key={index}
            src={video.src}
            title={video.title}
            border={border}
          />
        ))}
      </div>

      {data.copyright && (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500 text-muted">
            {t(data.copyright.key)}
          </p>
        </div>
      )}
    </div>
  );
};
