export default {
  name: 'who_we_are_item',
  display_name: 'Who We Are Item',
  schema: {
    icon: {
      type: 'text',
      display_name: 'Icon (SVG)',
      required: true,
      description: 'Paste SVG code here',
    },
    title: {
      type: 'text',
      display_name: 'Title',
      required: true,
    },
    description: {
      type: 'text',
      display_name: 'Description',
      required: true,
    },
  },
  preview_field: 'title',
  is_root: false,
  is_nestable: true,
  all_presets: [],
  real_name: 'Who We Are Item',
};