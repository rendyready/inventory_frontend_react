import { create } from 'zustand';

const useSidebarStore = create((set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (val) => set({ isSidebarOpen: val }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export default useSidebarStore;
