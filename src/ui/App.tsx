import { Card } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { useEffect, useState } from "react";
import Page from "./Page/Page";
import Footer from "./Footer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

function App() {
  const addPage = useStore((state) => state.addPage);
  const pages = useStore((state) => state.pages);
  const [currentPage, setPage] = useState(0);
  useEffect(() => {
    if (!pages[currentPage] && currentPage !== 0) setPage(0);
  }, [currentPage, pages]);

  return (
    <>
      <div className="flex flex-col w-full min-h-screen">
        <div className="flex flex-col gap-4 justify-center items-center w-full h-full flex-grow">
          <div className="flex flex-col gap-1">
            <h1>Copy Site</h1>
            <div className="flex flex-row justify-center items-center pt-4">
              
            </div>
          </div>
          {pages[currentPage]?.id && <Page pageId={pages[currentPage].id} setPage={setPage} />}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
