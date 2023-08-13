import React from 'react';

export interface YoutubeEmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  embedId: string;
  className?: string;
  iframeClassName?: string;
  autoplay?: boolean;
}

export const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({
  embedId,
  className,
  iframeClassName,
  autoplay,
}) => (
  <div className={className}>
    <iframe
      width="853"
      height="480"
      className={iframeClassName}
      src={`https://www.youtube.com/embed/${embedId}${autoplay ? '?autoplay=1' : ''}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);
