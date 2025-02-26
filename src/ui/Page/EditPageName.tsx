import { EditIcon, TrashIcon } from "@/assets/Icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store";

function EditPageName({ pageId }: { pageId: string }) {
  const removePage = useStore((state) => state.removePage);
  const pages = useStore((state) => state.pages);
  const setPageName = useStore((state) => state.setPageName);
  const page = pages.find((x) => x.id == pageId) as (typeof pages)[number];

  return (
    <Dialog>
      <DialogTrigger>
        <EditIcon className="hover:cursor-pointer hover:brightness-50 active:brightness-35 size-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Copy Value</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-2">
              <Input
                value={page.name}
                autoComplete="off"
                name="Page Name"
                onChange={(e) => setPageName(pageId, e.target.value)}
              />
              <div className="flex flex-row justify-between">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Save
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="button" variant="secondary" onClick={()=>{removePage(pageId)}}>
                    <TrashIcon className="hover:cursor-pointer hover:brightness-50 active:brightness-35"/>
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default EditPageName;
