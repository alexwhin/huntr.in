<template>
  <div>
    <div class="editor">

      <div class="field has-addons slug-selection">
        <p class="control">
          <a class="button is-static">
            https://producthunt.com/posts/
          </a>
        </p>
        <p class="control slug-control" v-bind:class="{ 'is-loading': widgetReloading }">
          <input v-model="settings.slug" v-on:focus="slugError = false" @change="updateWidgetCode" v-bind:class="{ error: slugError }" name="slug" class="input" type="text" placeholder="my-product">
        </p>
      </div>
      <div class="error-message" v-if="slugError">
        Please enter a valid product (e.g producthunt.com/<strong>my-product</strong>)
      </div>

      <div class="checkboxes" v-bind:class="{ faded: slugError }">
        <div class="field">
          <input v-model="settings.onlyShowOnParam" @change="updateWidgetCode" id="onlyShowOnParam" type="checkbox" />
          <label for="onlyShowOnParam">
            <span></span>
            Only load when&nbsp;<font color="#d85631">?ref=producthunt</font>&nbsp;appears in URL
          </label>
        </div>
        <div class="field">
          <input v-model="settings.showOnMobile" @change="updateWidgetCode" id="showOnMobile" type="checkbox" />
          <label for="showOnMobile">
            <span></span>
            Do&nbsp;<strong>not</strong>&nbsp;show on mobile / tablet devices
          </label>
        </div>
        <div class="field">
          <input v-model="settings.reviewShow" @change="updateWidgetCode" id="reviewShow" type="checkbox" />
          <label for="reviewShow">
            <span></span>
            Remove floating reviews count
          </label>
        </div>

        <form v-if="settings.makePayment" action="/charge" method="post" id="payment-form">
          <div class="form-row">
            <label for="card-element">
              Credit or debit card
            </label>
            <div id="card-element"></div>
            <div id="card-errors" role="alert"></div>
          </div>
          <button>Make Payment</button>
        </form>

      </div>
    </div>

    <div v-on:click="checkSlugChanged" class="snippet" v-bind:class="{ faded: slugError }">
      <pre v-highlightjs v-highlightjs="widgetCode">
        <code class="javascript"></code>
      </pre>
      <div class="copy">
        Embed product hunt reviews by pasting the above into your site
        <a v-clipboard="widgetCode">Copy</a>
      </div>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'

  import VueHighlightJS from 'vue-highlightjs'
  Vue.use(VueHighlightJS)

  import VueClipboards from 'vue-clipboards';
  Vue.use(VueClipboards);

  export default {

    components: {},

    data () {
      return {
        settings: {
          slug: '',
          onlyShowOnParam: null,
          showOnMobile: null,
          makePayment: false,
          reviewShow: null
        },
        widgetReloading: false,
        settingsString: '',
        slugError: false,
        widgetCode: ''
      }
    },

    mounted: function () {

      /* Slug change listenser */
      document.querySelector("input[name='slug']").addEventListener('keyup', this.updateWidgetCode);
      document.querySelector("input[name='slug']").addEventListener('keyup', this.checkProductData);

      /* Load widget code */
      this.updateWidgetCode()
    },

    methods: {

     /**
      * Build settings string
      *
      * @return string
      */
      getSettingsString: function () {

        let slug = (this.settings.slug == '') ? 'my-product' : this.settings.slug;
        let settings = "  slug: '" + slug + "',\n"

        if (this.settings.onlyShowOnParam) settings += "    onlyShowOnParam: true,\n"
        if (this.settings.showOnMobile) settings += "    showOnMobile: false,\n"
        if (this.settings.reviewShow) settings += "    reviewShow: false,\n"

        return settings
      },

      /**
       * Set settings string
       *
       */
      setSettingsString: function () {
        this.settingsString = this.getSettingsString()
      },

      /**
       * Clean product slug
       *
       */
      cleanProductSlug: function () {

        let slug = this.settings.slug
        let remove = [
          'https://', 'http://', 'www.', 'producthunt.com',
          'posts/', '/', '.', '_'
        ]

        for(var i = 0; i < remove.length; i++) {
          slug = slug.replace(remove[i], '')
        }

        this.settings.slug = slug
      },

      /**
       * Build widget code
       *
       * @return string
       */
      getWidgetCode: function () {

        this.cleanProductSlug()

        let code = "<script type=\"text/javascript\">\n" +
                   "  window.huntr = {\n" +
                   "  " + this.settingsString +
                   "  };\n" +
                   "  a = document.createElement('script');\n" +
                   "  a.src = 'https://huntr.in/x.js';\n" +
                   "  document.body.appendChild(a);\n" +
                   "<\/script>"

        return code.replace(",\n  }", "\n  }")
      },

      /**
       * Adjust widget design
       *
       */
      adjustWidgetDesign: function () {

        /* Reviews count */
        if (this.settings.reviewShow) {
          document.getElementById('huntr-example').className = 'hidden-reviews-count'
        } else {
          document.getElementById('huntr-example').className = ''
        }
      },

      /**
       * Update widget code
       *
       */
      updateWidgetCode: function () {

        this.adjustWidgetDesign()
        this.setSettingsString()
        this.widgetCode = this.getWidgetCode()
      },

      /**
       * Check slug changed on copy
       *
       */
      checkSlugChanged: function () {

        this.slugError = ((this.settings.slug === '') ? true : false)
      },

      /**
       * Check product data
       *
       */
      checkProductData: _.debounce(function (e) {

        const slug = e.target.value

        if (slug !== '' && slug.length > 5) {

          this.slugError = false
          this.widgetReloading = true

          axios.get('/api/products/fetch/' + slug + '.json').then(function (response) {

            if (!response.data['error']) {
              window.HuntrReloadSlug = slug
            } else {
              this.slugError = true
            }

            this.widgetReloading = false

          }.bind(this));
        }
      }, 1500)

    }
  }

</script>
