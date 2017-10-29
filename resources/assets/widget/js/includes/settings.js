
  const defaultSettings = {
    'containers': {
      container: 'huntr',
      inner: 'huntr-inner',
      button: 'huntr-button',
      buttonText: 'huntr-text',
      content: 'huntr-content',
      reviews: 'huntr-reviews',
      header: 'huntr-header',
      reviewLinks: 'ph-review-link',
      productLinks: 'ph-product-link'
    },
    slug: '',
    onlyShowOnParam: false,
    showOnMobile: true,
    widgetHeight: 580,
    widgetWidth: 585,
    reviewShow: true,
    reviewText: 'reviews',
    reviewColor: '#999999',
    ctaReviewText: 'Write Review',
    brandingURL: 'https://huntr.in/',
    brandingText: 'Built with Huntr',
    serverURL: (window.localhost) ? 'http://192.168.0.68:3000/' : 'https://huntr.in/',
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
