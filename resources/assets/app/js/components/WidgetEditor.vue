<template>
  <div>
    <div class="editor">
      <h3>What product are you working on?</h3>

      <div class="field has-addons slug-selection">
        <p class="control">
          <a class="button is-static">
            https://producthunt.com/posts/
          </a>
        </p>
        <p class="control slug-control">
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





        <!-- <div class="cell example example4" style="padding: 1.5em 0;">
          <form>
            <fieldset>
              <legend class="card-only" data-tid="elements_examples.form.pay_with_card">Pay with card</legend>
              <legend class="payment-request-available" data-tid="elements_examples.form.enter_card_manually">Or enter card details</legend>
              <div class="container">
                <div id="example4-card"></div>
                <button type="submit" data-tid="elements_examples.form.donate_button">Donate</button>
              </div>
            </fieldset>
            <div class="error" role="alert"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
                <path class="base" fill="#000" d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"></path>
                <path class="glyph" fill="#FFF" d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"></path>
              </svg>
              <span class="message"></span></div>
              <input type="submit" class="button" value="Submit">
          </form>
          <div class="success">
            <div class="icon">
              <svg width="84px" height="84px" viewBox="0 0 84 84" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <circle class="border" cx="42" cy="42" r="40" stroke-linecap="round" stroke-width="4" stroke="#000" fill="none"></circle>
                <path class="checkmark" stroke-linecap="round" stroke-linejoin="round" d="M23.375 42.5488281 36.8840688 56.0578969 64.891932 28.0500338" stroke-width="4" stroke="#000" fill="none"></path>
              </svg>
            </div>
            <h3 class="title" data-tid="elements_examples.success.title">Payment successful</h3>
            <p class="message"><span data-tid="elements_examples.success.message">Thanks for trying Stripe Elements. No money was charged, but we generated a token: </span><span class="token">tok_189gMN2eZvKYlo2CwTBv9KKh</span></p>
            <a class="reset" href="#">
              <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path fill="#000000" d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"></path>
              </svg>
            </a>
          </div>
        </div> -->






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
          reviewShow: null
        },
        settingsString: '',
        slugError: false,
        widgetCode: ''
      }
    },

    mounted: function () {

      /* Slug change listenser */
      document.querySelector("input[name='slug']").addEventListener('keyup', this.updateWidgetCode);
      document.querySelector("input[name='slug']").addEventListener('keydown', this.checkProductData);

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
          axios.get('/api/products/fetch/' + slug).then(function (response) {

            if (response.data['error']) this.slugError = true
          })
          .catch(function () {
            this.slugError = true
          }.bind(this));
        }
      }, 2500)

    }
  }

</script>
