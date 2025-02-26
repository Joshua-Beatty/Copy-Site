import { EditIcon, PlusIcon } from "@/assets/Icons";
import { useStore } from "@/lib/store";
import EditPageName from "./EditPageName";
import Copy from "./Copy";
import { Card } from "@/components/ui/card";
import ChangePage from "./ChangePage";

function Page({
  pageId,
  setPage,
}: {
  pageId: string;
  setPage: (index: number) => void;
}) {
  const addCopy = useStore((state) => state.addCopy);
  const pages = useStore((state) => state.pages);
  const page = pages.find((x) => x.id == pageId) as (typeof pages)[number];
  return (
    <Card className="flex w-full max-w-md p-4">
      <div>
        <h2 className="flex flex-row gap-1 border-b pb-2">
          <div className="flex flex-row gap-1 flex-grow justify-start items-start">
            <ChangePage pageId={pageId} setPage={setPage} />
            <EditPageName pageId={pageId} />
          </div>
          <div onClick={() => addCopy(pageId)}>
            <PlusIcon className="size-8 hover:cursor-pointer hover:brightness-50 active:brightness-35" />
          </div>
        </h2>
        <div className="pt-3">
          {page.copies.map((x) => (
            <Copy key={x.id} copyId={x.id} pageId={pageId} />
          ))}
        </div>
      </div>
    </Card>
  );
}

export default Page;
