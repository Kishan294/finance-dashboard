import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <p>This is authenticated Layout</p>
      <UserButton />
    </div>
  );
}
