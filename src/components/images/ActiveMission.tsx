import Image from "next/image";
import styled from "styled-components";

interface ActiveMissionProps {
  imageUrl: string;
  altTag: string;
  titleTag: string;
}

const MissionImage = styled.div`
  position: relative;
  background-color: var(--dark-blue);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 0 0 4px hsla(0, 0%, 0%, 0.4);
  overflow: hidden;
  isolation: isolate;
`;

export const ActiveMission: React.FC<ActiveMissionProps> = ({
  imageUrl,
  altTag,
  titleTag,
}) => {
  return (
    <MissionImage>
      <Image
        src={imageUrl}
        alt={altTag}
        title={titleTag}
        layout="fill"
        objectFit="cover"
      />
    </MissionImage>
  );
};
