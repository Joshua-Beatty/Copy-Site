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
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/lib/store";
function EditCopyValue({ pageId, copyId }: { pageId: string; copyId: string }) {
    const updateCopy = useStore((state) => state.updateCopy);
    const removeCopy = useStore((state) => state.removeCopy);
  const pages = useStore((state) => state.pages);
  const page = pages.find((x) => x.id == pageId) as (typeof pages)[number];
  const copy = page.copies.find(
    (x) => x.id == copyId
  ) as (typeof page.copies)[number];

  return (
    <Dialog>
      <DialogTrigger className="size-4">
        <EditIcon className="hover:cursor-pointer hover:brightness-50 active:brightness-35 size-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Copy Value</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-2">
              <h3>Name</h3>
              <Input
                value={copy.name}
                autoComplete="off"
                name="Page Name"
                onChange={(e) =>
                  updateCopy(pageId, copyId, e.target.value, copy.value)
                }
              />
              <h3>Value</h3>
              <Textarea
                value={copy.value}
                autoComplete="off"
                rows={5}
                name="Page Name"
                onChange={(e) =>
                  updateCopy(pageId, copyId, copy.name, e.target.value)
                }
              />
              <div className="flex flex-row justify-between">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Save
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="button" variant="secondary" onClick={()=>{removeCopy(pageId, copyId)}}>
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

export default EditCopyValue;
