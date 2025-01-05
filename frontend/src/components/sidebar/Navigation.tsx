export interface NavigationProps {
  // linkTo: string;
  text: string;
}

export const Navigation = ({ text }: NavigationProps) => {
  return <p class="font-bold mt-6">{text}</p>;
};
