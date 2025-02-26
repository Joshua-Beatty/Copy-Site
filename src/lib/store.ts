import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 } from "uuid";
type Copy = { name: string; value: string; id: string };
type Page = { copies: Copy[]; name: string; id: string };
type TextStore = {
  pages: Page[];
  addPage: () => void;
  setPageName: (setId: string, name: string) => void;
  addCopy: (setId: string) => void;
  updateCopy: (
    setId: string,
    copyId: string,
    name: string,
    value: string
  ) => void;
  removeCopy: (setId: string, copyId: string) => void;
  removePage: (setId: string) => void;
};

export const textStore = create<TextStore>()(
  persist(
    (set, get) => ({
      pages: [{ copies: [], name: "Links", id: v4() }],
      addPage: () => {
        const current = structuredClone(get());
        current.pages.push({
          name: `Page ${current.pages.length + 1}`,
          copies: [],
          id: v4(),
        });
        set(current);
      },
      setPageName: (setId: string, name: string) => {
        const current = structuredClone(get());
        const page = current.pages.find((x) => x.id == setId);
        if (page) {
          page.name = name;
          set(current);
        } else {
          console.error(`No set ${setId}`);
        }
      },
      addCopy: (setId: string) => {
        const current = structuredClone(get());
        current.pages
          .find((x) => x.id == setId)
          ?.copies.push({ name: "", value: "", id: v4() });
        set(current);
      },
      updateCopy: (
        setId: string,
        copyId: string,
        name: string,
        value: string
      ) => {
        const current = structuredClone(get());
        const copy = current.pages
          .find((x) => x.id == setId)
          ?.copies.find((x) => x.id == copyId);
        if (copy) {
          copy.name = name;
          copy.value = value;
          set(current);
        }
      },
      removeCopy: (setId: string, copyId: string) => {
        const current = structuredClone(get());
        const page = current.pages.find((x) => x.id == setId);
        if (page) {
          page.copies = page.copies.filter((x) => x.id !== copyId);
          set(current);
        }
      },
      removePage: (setId: string) => {
        const current = structuredClone(get());
        const pages = current.pages.filter((x) => x.id !== setId);
        if (pages.length === 0) {
          set({ pages: [{ copies: [], name: "Page 1", id: v4() }] });
        } else {
          set({ pages });
        }
      },
    }),
    {
      name: "copy-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
