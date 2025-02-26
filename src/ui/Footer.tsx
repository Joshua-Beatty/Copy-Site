import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Footer() {
  return (
    <div className="flex flex-row w-full justify-end pr-5">
      <Dialog>
        <DialogTrigger>
          <p className="hover:underline hover:cursor-pointer">About</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex flex-col gap-4">
                <div>
                  <h2>About</h2>
                  <p>This website is created by Joshua Beatty.</p>
                  <p className="mt-0">
                    <a
                      className="text-blue-200 hover:underline hover:cursor-pointer"
                      href="https://joshbeatty.me"
                      target="_blank"
                    >
                      About Me.
                    </a>
                  </p>
                </div>
                <div>
                  <h3>Atribution</h3>
                  <p>
                    This website uses Tabler for Icons. Tabler is licensed under
                    the MIT License.
                  </p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default Footer;
