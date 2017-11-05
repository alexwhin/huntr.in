
  import {settings} from './settings'
  import WidgetMarkup from './widget-markup'

  class WidgetReload {

    constructor() {

      window.HuntrReloadSlug = false
      let reloadLoop = setInterval(function () {
        if (window.HuntrReloadSlug !== false) {

          settings.slug = window.HuntrReloadSlug
          axios.get(settings.serverURL + settings.productData + settings.slug + '.json').then(function(response){

            new WidgetMarkup(response.data)
          });

          window.HuntrReloadSlug = false
          clearInterval(reloadLoop)
        }
      }.bind(this), 1500)
    }

  }

  export { WidgetReload as default}
