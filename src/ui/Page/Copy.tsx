import { CopyIcon } from "@/assets/Icons";
import { useStore } from "@/lib/store";
import EditCopyValue from "./EditCopyValue";

function Copy({ pageId, copyId }: { pageId: string; copyId: string }) {
  const pages = useStore((state) => state.pages);
  const page = pages.find((x) => x.id == pageId) as (typeof pages)[number];
  const copy = page.copies.find(
    (x) => x.id == copyId
  ) as (typeof page.copies)[number];

  return (
    <div className="flex flex-row gap-2 justify-between w-full items-center">
      <h4 className="flex flex-row gap-1">{copy.name}<EditCopyValue copyId={copyId} pageId={pageId}/></h4>
      <div onClick={()=>{ navigator.clipboard.writeText(copy.value)}}>
      <CopyIcon className="size-10 hover:cursor-pointer hover:brightness-50 active:brightness-35"/>
      </div>
    </div>
  );
}
export default Copy;
