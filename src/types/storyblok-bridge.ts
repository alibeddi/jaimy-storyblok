// TypeScript declarations for Storyblok bridge functionality
declare global {
  interface Window {
    storyblok: {
      on: (event: string, callback: (payload?: unknown) => void) => void;
      saveDraft: () => void;
      publish: () => void;
      enterEditmode: () => void;
      pingEditor: (callback: (event: unknown) => void) => void;
      resolveRelations: (
        relations: unknown[],
        callback: (relations: unknown[]) => void
      ) => void;
      init: (config: unknown) => void;
    };
  }
}

export {};
