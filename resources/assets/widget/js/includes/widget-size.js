
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
        this.setContentHeight(86)
      }
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

  }

  export { WidgetSize as default}
