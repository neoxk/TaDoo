import { ProfileIcon } from "../common/ProfileIcon";

export interface ProfileProps {
  name: string;
  imageUrl: string;
}

export const Profile = ({ name, imageUrl }: ProfileProps) => {
  return (
    <div class="absolute left-0 bottom-0 flex items-center gap-4 hover:bg-white px-2 py-3 rounded-xl hover:cursor-pointer">
      <ProfileIcon imageUrl={imageUrl} size={40} />
      <p>{name}</p>
    </div>
  );
};
