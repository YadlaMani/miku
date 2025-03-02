import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
export function Appbar() {
  return (
    <div className="flex justify-between px-2 py-1">
      <div className="text-2xl font-bold">Miku</div>
      <div>
        <header className="flex justify-end items-center p-4 gap-4 h-16">
          <SignedOut>
            <Button>
              {" "}
              <SignInButton />
            </Button>
            <Button>
              <SignUpButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
      </div>
    </div>
  );
}
