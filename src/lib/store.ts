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
  updateCopy: (setId: string, copyId: string, name: string, value: string) => void;
  removeCopy: (setId: string, copyId: string) => void;
  removePage: (setId: string) => void;
};

const defaultPages = (): Page => ({
  copies: [
    { name: "Email Address", value: "example@example.com", id: v4() },
    { name: "Long Text Example", value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`, id: v4() }
  ],
  name: "Links",
  id: v4()
})

export const useStore = create<TextStore>()(
  persist(
    (set) => ({
      pages: [defaultPages()],
      addPage: () => set(state => ({
        pages: [...state.pages, {
          name: `Page ${state.pages.length + 1}`,
          copies: defaultPages().copies,
          id: v4()
        }]
      })),
      setPageName: (setId, name) => set(state => ({
        pages: state.pages.map(page => 
          page.id === setId ? { ...page, name } : page
        )
      })),
      addCopy: (setId) => set(state => ({
        pages: state.pages.map(page => 
          page.id === setId ? { 
            ...page, 
            copies: [...page.copies, { name: "New Item", value: "", id: v4() }]
          } : page
        )
      })),
      updateCopy: (setId, copyId, name, value) => set(state => ({
        pages: state.pages.map(page => 
          page.id === setId ? {
            ...page,
            copies: page.copies.map(copy =>
              copy.id === copyId ? { ...copy, name, value } : copy
            )
          } : page
        )
      })),
      removeCopy: (setId, copyId) => set(state => ({
        pages: state.pages.map(page => 
          page.id === setId ? {
            ...page,
            copies: page.copies.filter(copy => copy.id !== copyId)
          } : page
        )
      })),
      removePage: (setId) => set(state => {
        const filteredPages = state.pages.filter(page => page.id !== setId);
        return { pages: filteredPages.length > 0 ? filteredPages : [defaultPages()] };
      })
    }),
    {
      name: "copy-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);