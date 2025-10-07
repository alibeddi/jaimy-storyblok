type BlokWithEditable = { _editable?: string };

export function sbEditable(blok?: BlokWithEditable) {
  if (!blok?._editable) return {} as Record<string, string>;
  try {
    const options = JSON.parse(
      blok._editable.replace("<!--#storyblok#", "").replace("-->", "")
    );
    return {
      "data-blok-c": JSON.stringify(options),
      "data-blok-uid": `${options.id}-${options.uid}`,
      className: "storyblok__outline",
    } as Record<string, string>;
  } catch {
    return {} as Record<string, string>;
  }
}
