interface ProfileIconProps {
  imageUrl: string;
  size: number;
}

export const ProfileIcon = ({ imageUrl, size }: ProfileIconProps) => {
  return (
    <img
      class={`rounded-full`}
      style={`width: ${size}px; height: ${size}px`}
      src={imageUrl}
      alt="Profile picture"
    />
  );
};
