import { create } from "zustand";

type ThemeState = {
  fileContent: string;
  setFileContent: (content: string) => void;
};

export const useEventsStore = create<ThemeState>((set) => ({
  fileContent: "",
  setFileContent: (content: string) => set({ fileContent: content }),
}));
