const featureSectionSchema = {
  name: 'feature-section',
  display_name: 'Feature Section',
  schema: {
    title: {
      type: 'text',
      display_name: 'Title',
      required: false
    },
    subtitle: {
      type: 'text',
      display_name: 'Subtitle',
      required: false
    },
    media: {
      type: 'asset',
      display_name: 'Media (Image or Video)',
      filetypes: ['images', 'videos'],
      required: false
    },
    features: {
      type: 'bloks',
      display_name: 'Features',
      restrict_components: true,
      component_whitelist: ['feature_item'],
      maximum: 4,
      required: true
    },
    layout: {
      type: 'option',
      display_name: 'Layout',
      options: [
        { value: 'media_left', name: 'Media on Left' },
        { value: 'media_right', name: 'Media on Right' }
      ],
      default_value: 'media_left',
      required: false
    },
    icon_color: {
      type: 'custom',
      field_type: 'tailwind-color',
      display_name: 'Icon Color',
      default_value: 'text-red-600',
      required: false
    },
    icon_bg_color: {
      type: 'custom',
      field_type: 'tailwind-color',
      display_name: 'Icon Background Color',
      default_value: 'bg-red-100',
      required: false
    }
  },
  preview_field: 'title',
  is_root: false,
  is_nestable: true,
  real_name: 'Feature Section',
  component_group_name: 'Content'
};

export default featureSectionSchema;