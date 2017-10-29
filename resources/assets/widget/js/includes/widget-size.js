
  import {settings} from './settings'

  class WidgetSize {

    constructor() {

      this.widgetSize()

      /* Window resize */
      window.addEventListener("resize", function(){

        this.widgetSize()
      }.bind(this));
    }

    /**
     * Calculate widget size
     */
    widgetSize() {

      let contentHeight = this.getContentHeight(),
          windowHeight = window.innerHeight,
          windowWidth = window.innerWidth

      if (contentHeight < 10) { // no reviews

        document.getElementById(settings.containers.content).className = 'no-reviews'
        contentHeight = 88

      } else {

        if (contentHeight > (windowHeight + 45)) contentHeight = (windowHeight - 120)
        if (contentHeight > settings.widgetHeight) contentHeight = settings.widgetHeight
        if (contentHeight < 320) contentHeight = 312
        if (windowHeight < 425) contentHeight = 200
      }

      let contentWidth = (windowWidth < settings.widgetWidth) ? '90%' : settings.widgetWidth + 'px'
      if (windowWidth < 700 && windowHeight < 400) contentWidth = '92%' // landscape
      if (windowWidth < 380 && windowHeight < 700) contentWidth = '87%' // landscape
      if (windowWidth < 415 && windowHeight > 700) contentWidth = '88.5%' // iPhone 6P

      this.setContentHeight(contentHeight)
      this.setContentWidth(contentWidth)
    }

    /**
     * Get widget height
     *
     * @return {int} height
     */
    getContentHeight() {

      let container = document.getElementById(settings.containers.reviews),
          style = window.getComputedStyle(container),
          height = style.height.replace('px', '')

      return parseInt(height)
    }

    /**
     * Set widget height
     *
     * @param {int} height
     */
    setContentHeight(height) {

      let container = document.getElementById(settings.containers.inner)
          container.style.height = height + 'px'
    }

    /**
     * Set widget width
     *
     * @param {int} width
     */
    setContentWidth(width) {

      let container = document.getElementById(settings.containers.inner)
          container.style.width = width
    }

  }

  export { WidgetSize as default}
