
  const defaultSettings = {
    'containers': {
      container: 'huntr',
      inner: 'huntr-inner',
      button: 'huntr-button',
      buttonText: 'huntr-text',
      content: 'huntr-content',
      reviews: 'huntr-reviews',
      example: 'huntr-example',
      header: 'huntr-header',
      reviewLinks: 'ph-review-link',
      productLinks: 'ph-product-link'
    },
    slug: '',
    exampleWidget: false,
    onlyShowOnParam: false,
    showOnMobile: true,
    reviewShow: true,
    reviewText: 'reviews',
    reviewColor: 'rgba(0, 0, 0, 0.5)',
    ctaReviewText: 'Write Review',
    brandingURL: 'https://huntr.in/',
    brandingText: 'powered by huntr.in',
    serverURL: (window.localhost) ? 'http://localhost:3000/' : '//huntr.in/',
    productURL: 'https://www.producthunt.com/posts/',
    productData: 'api/products/',
    stylesheet: 'widget/app.css'
  }

  /**
   * Fetch widget settings
   *
   * @param object settings
   * @return object defaultsSettings
   */
  function getSettings(settings)
  {

    let fromWidget = window.huntr, // widget
        defaultsSettings = settings // default

    for (let key of Object.keys(defaultsSettings)) {

      let fromWidgetValue = fromWidget[key],
          defaultValue = defaultsSettings[key]

      if (fromWidgetValue === undefined) continue // Keep default value

      // Switch out default with widget value
      if (fromWidgetValue !== defaultValue) defaultsSettings[key] = fromWidgetValue
    }

    return defaultsSettings
  }

  export const settings = getSettings(defaultSettings)
