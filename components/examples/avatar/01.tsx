import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Component() {
  return (
    <Avatar>
      <AvatarImage src="https://ChadCn-ui-images.netlify.app/avatars/01.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
