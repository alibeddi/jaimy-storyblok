// TypeScript declarations for Storyblok bridge functionality
declare global {
  interface Window {
    storyblok: {
      on: (event: string, callback: (payload?: any) => void) => void;
      saveDraft: () => void;
      publish: () => void;
      enterEditmode: () => void;
      pingEditor: (callback: (event: any) => void) => void;
      resolveRelations: (
        relations: any[],
        callback: (relations: any[]) => void
      ) => void;
      init: (config: any) => void;
    };
  }
}

export {};
