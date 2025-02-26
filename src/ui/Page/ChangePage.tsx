import { PlusIcon } from "@/assets/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/lib/store";
import { useRef, useState } from "react";

function ChangePage({
  pageId,
  setPage,
}: {
  pageId: string;
  setPage: (index: number) => void;
}) {
  const addPage = useStore((state) => state.addPage);
  const pages = useStore((state) => state.pages);
  const page = pages.find((x) => x.id == pageId) as (typeof pages)[number];
  const [open, setOpen] = useState(false);
  const dummyRef = useRef<HTMLDivElement>(null);
  function newPage() {
    const newIndex = pages.length;
    addPage();
    setPage(newIndex);
  }
  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="focus-visible:outline-0">
          <h2 className="hover:cursor-pointer hover:brightness-50 active:brightness-35 focus-visible:outline-0">
            {page?.name}
          </h2>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {pages.map((x, i) => (
            <DropdownMenuItem
              onClick={() => setPage(i)}
              key={x.id}
            >
              {x.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={newPage}>
            <PlusIcon className="size-4" />
            New Page
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div ref={dummyRef} />
    </>
  );
}
export default ChangePage;
