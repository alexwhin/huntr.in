
  import {settings} from './settings'

  class Stylesheet {

    constructor() {

      const tag = document.createElement('link')
      tag.rel = 'stylesheet'
      tag.type = 'text/css'
      tag.href = settings.stylesheet
      tag.media = 'all'
      document.getElementsByTagName('head')[0].appendChild(tag)
    }
  }

  export { Stylesheet as default}
