
  import axios from 'axios'
  import {settings} from './includes/settings'
  import Stylesheet from './includes/stylesheet'
  import WidgetMarkup from './includes/widget-markup'
  import WidgetReload from './includes/widget-reload'

  new Stylesheet()

  let load = true
  if (window.innerWidth < 850 && !settings.showOnMobile) load = false

  /* Only show on referral */
  if (settings.onlyShowOnParam) {
    if (window.location.href.indexOf('rel=producthunt') > -1) {
    } else {
      load = false
    }
  }

  /* Product data */
  if (load) {
    window.axios = axios
    axios.get(settings.serverURL + settings.productData + settings.slug + '.json').then(function(response){

      new WidgetMarkup(response.data)
    });
  }

  /* Reloader (Landing Page) */
  new WidgetReload()
