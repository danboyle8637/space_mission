import Image from "next/image";

interface MissionCardBannerProps {
  imageUrl: string;
  altTag: string;
  titleTag: string;
}

export const MissionCardBanner: React.FC<MissionCardBannerProps> = ({
  imageUrl,
  altTag,
  titleTag,
}) => {
  return (
    <Image
      src={imageUrl}
      width={600}
      height={300}
      alt={altTag}
      title={titleTag}
      layout="responsive"
    />
  );
};
