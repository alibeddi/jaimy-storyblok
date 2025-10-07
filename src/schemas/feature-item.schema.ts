export default {
  name: 'feature_item',
  display_name: 'Feature Item',
  schema: {
    icon: {
      type: 'text',
      display_name: 'Icon (SVG)',
      required: true,
      description: 'Paste SVG code for the icon'
    },
    title: {
      type: 'text',
      display_name: 'Title',
      required: true
    },
    description: {
      type: 'text',
      display_name: 'Description',
      required: true
    }
  },
  preview_field: 'title',
  is_root: false,
  is_nestable: true,
  real_name: 'Feature Item',
  component_group_name: 'Content'
};