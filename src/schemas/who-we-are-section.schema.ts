export default {
  name: 'who_we_are_section',
  display_name: 'Who We Are Section',
  schema: {
    title: {
      type: 'text',
      display_name: 'Title',
      required: false,
    },
    subtitle: {
      type: 'text',
      display_name: 'Subtitle',
      required: false,
    },
    media: {
      type: 'asset',
      display_name: 'Media',
      filetypes: ['images', 'videos'],
      required: false,
    },
    layout: {
      type: 'option',
      display_name: 'Layout',
      options: [
        { name: 'Media Left', value: 'media_left' },
        { name: 'Media Right', value: 'media_right' },
      ],
      default_value: 'media_left',
      required: false,
    },
    icon_color: {
      type: 'text',
      display_name: 'Icon Color',
      description: 'Tailwind color class for icons (e.g., text-red-600)',
      default_value: 'text-red-600',
      required: false,
    },
    icon_bg_color: {
      type: 'text',
      display_name: 'Icon Background Color',
      description: 'Tailwind color class for icon backgrounds (e.g., bg-red-100)',
      default_value: 'bg-red-100',
      required: false,
    },
    features: {
      type: 'bloks',
      display_name: 'Features',
      restrict_components: true,
      component_whitelist: ['who_we_are_item'],
      required: false,
    },
  },
  preview_field: 'title',
  is_root: false,
  is_nestable: true,
  all_presets: [],
  real_name: 'Who We Are Section',
};