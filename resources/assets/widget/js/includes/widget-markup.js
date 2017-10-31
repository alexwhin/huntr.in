
  import {settings} from './settings'
  import WidgetSize from './widget-size'

  class WidgetMarkup {

    constructor(productData) {

      this.productData = productData
      if (!productData.error) {

        /* Combine markup */
        const markup = this.buttonMarkup() +
                       '<div id="huntr-inner" class="' + this.getReviewCountClass() + '">' +
                         '<div id="huntr-content">' +
                            this.widgetHeaderMarkup() +
                            '<ul id="huntr-reviews">' +
                              this.widgetReviewsMarkup() +
                            '</ul>' +
                         '</div>' +
                         this.getBranding() +
                       '</div>'

        /* Append markup to body */
        this.appendMarkupToBody(markup)

        /* After load changes */
        this.reviewCountStyling()
        this.setProductURL()

        /* Button click */
        document.getElementById(settings.containers.button).addEventListener("click", function(){
          this.openWidget()
          new WidgetSize()
        }.bind(this));

        if (settings.exampleWidget) this.startExampleWidget() // demo
      }
    }

    /**
     * Open widget
     *
     */
    openWidget() {
      document.getElementById(settings.containers.button).classList.toggle("huntr-active")
      document.getElementById(settings.containers.inner).classList.toggle("huntr-active")
    }

    /**
     * Example widget demo
     *
     */
    startExampleWidget() {
      setTimeout(() => {

        this.openWidget()

      }, 1000);
    }

    /**
     * Branding link
     *
     * @return {string}
     */
    getBranding() {

      let url = settings.brandingURL + '?ref=' + settings.slug
      let markup = '<a href="' + url + '" target="_blank" class="huntr-branding">' +
                     settings.brandingText +
                   '</a>'

      return markup
    }

    /**
     * Review count class
     *
     * @return {string}
     */
    getReviewCountClass() {

      let name = 'one'
      if (this.productData.reviews.count > 0) name = 'two'
      if (this.productData.reviews.count > 1) name = 'three'

      return name
    }

    /**
     * Product hunt logo
     *
     * @return {string}
     */
    getProductHuntLogo() {
      return '<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20" fill="#DA552F"></path><path d="M22.667 20H17v-6h5.667c1.656 0 3 1.343 3 3s-1.344 3-3 3m0-10H13v20h4v-6h5.667c3.866 0 7-3.134 7-7s-3.134-7-7-7" fill="#FFF"></path></g></svg>'
    }

    /**
     * Button avatars
     *
     * @return {string}
     */
    getButtonAvatars() {

      let markup = ''

      if (this.productData.reviews.count > 0) markup += '<li><img src="' + this.productData.reviews.list[0].avatar_url + '"></li>'
      if (this.productData.reviews.count > 1) markup += '<li><img src="' + this.productData.reviews.list[1].avatar_url + '"></li>'

      markup += '<li>' +
                  this.getProductHuntLogo() +
                '</li>'

      return markup
    }

    /**
     * Switch smiley SVG
     *
     * @param {string} selection
     * @return {string}
     */
    getSmiley(selection) {

      switch (selection) {

        case 'positive':
          return '<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="#66BE00"><path d="M11 20.975c-5.5 0-9.975-4.475-9.975-9.975S5.5 1.025 11 1.025 20.975 5.5 20.975 11 16.5 20.975 11 20.975zM10.999 1.52c-5.227 0-9.48 4.252-9.48 9.48 0 5.228 4.253 9.48 9.48 9.48s9.48-4.252 9.48-9.48c0-5.228-4.253-9.48-9.48-9.48z" stroke="#7CBC00"></path><path d="M11.054 15.43a6.555 6.555 0 0 1-4.42-1.727.477.477 0 0 1 .648-.698 5.589 5.589 0 0 0 3.772 1.47 5.595 5.595 0 0 0 3.674-1.386.482.482 0 0 1 .673.04.482.482 0 0 1-.04.673 6.467 6.467 0 0 1-4.307 1.629zm5.585-5.682c.099.064.232-.01.232-.13v-.004a1.288 1.288 0 0 0-2.574 0v.005c0 .119.134.188.233.129a1.995 1.995 0 0 1 1.05-.298 1.92 1.92 0 0 1 1.059.298zm-9.174 0c.1.064.233-.01.233-.13v-.004a1.288 1.288 0 0 0-2.574 0v.005c0 .119.133.188.232.129a1.995 1.995 0 0 1 1.05-.298 1.93 1.93 0 0 1 1.06.298z"></path></g></svg>'
          break

        case 'neutral':
          return '<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="#999"><path d="M11 20.975c-5.5 0-9.975-4.475-9.975-9.975S5.5 1.025 11 1.025 20.975 5.5 20.975 11 16.5 20.975 11 20.975zM11 1.52c-5.228 0-9.48 4.252-9.48 9.48 0 5.228 4.252 9.48 9.48 9.48 5.228 0 9.48-4.252 9.48-9.48 0-5.228-4.252-9.48-9.48-9.48z" stroke="#999"></path><path d="M16.09 9.347a1.024 1.024 0 1 1-2.05 0c0-.57.46-1.025 1.024-1.025a1.017 1.017 0 0 1 1.025 1.025zm-8.125 0a1.028 1.028 0 0 1-2.054 0c0-.57.46-1.025 1.03-1.025a1.02 1.02 0 0 1 1.024 1.025zm7.475 4.673H6.56a.475.475 0 0 1 0-.95h8.88a.475.475 0 0 1 0 .95z"></path></g></svg>'
          break

        case 'negative':
          return '<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g fill="#F95353"><path d="M11 20.975c-5.5 0-9.975-4.475-9.975-9.975S5.5 1.025 11 1.025 20.975 5.5 20.975 11 16.5 20.975 11 20.975zM11 1.52c-5.228 0-9.48 4.252-9.48 9.48 0 5.228 4.252 9.48 9.48 9.48 5.228 0 9.48-4.252 9.48-9.48 0-5.228-4.252-9.48-9.48-9.48z" stroke="#F95353"></path><path d="M4.317 9.97a.339.339 0 0 1-.164-.044.32.32 0 0 1-.108-.436c.534-.9 1.505-1.5 2.435-1.48a.319.319 0 0 1 .312.322.318.318 0 0 1-.317.312h-.03c-.697 0-1.44.465-1.85 1.168a.335.335 0 0 1-.278.158zm13.366 0a.315.315 0 0 1-.272-.153c-.416-.703-1.159-1.168-1.857-1.168h-.03a.315.315 0 0 1-.316-.312.316.316 0 0 1 .312-.322c.916-.02 1.9.58 2.435 1.48.09.149.04.347-.113.436a.341.341 0 0 1-.159.04zm-3.099 1.565a.093.093 0 0 0-.134.099c.12.584.694 1.03 1.387 1.03.698 0 1.272-.446 1.39-1.03.016-.075-.064-.139-.133-.1a2.55 2.55 0 0 1-1.257.322 2.585 2.585 0 0 1-1.253-.321zm-9.678 0c-.07-.035-.149.024-.134.099.114.584.693 1.03 1.391 1.03.698 0 1.273-.446 1.387-1.03.014-.075-.065-.139-.134-.1a2.55 2.55 0 0 1-1.258.322 2.6 2.6 0 0 1-1.252-.321zm9.5 5.064c.297.05.5-.297.302-.525-.861-1-2.203-1.638-3.708-1.638-1.505 0-2.847.643-3.708 1.638-.198.228.005.575.302.525A21.819 21.819 0 0 1 11 16.342c1.228.005 2.381.094 3.406.257z"></path></g></svg>'
          break
      }
    }

    /**
     * Switch smiley SVG (User)
     *
     * @param {array} userData
     * @return {string}
     */
    getUserSmiley(userData) {

      if (userData.positive_vote > 0) {
        return this.getSmiley('positive')
      } else if (userData.neutral_vote > 0) {
        return this.getSmiley('neutral')
      } else if (userData.negative_vote > 0) {
        return this.getSmiley('negative')
      }
    }

    /**
     * Set product hunt URL's
     */
    setProductURL() {

      let reviewLinks = document.getElementsByClassName(settings.containers.reviewLinks),
          productLinks = document.getElementsByClassName(settings.containers.productLinks)

      for(var i = 0; i < reviewLinks.length; i++) {
        reviewLinks.item(i).setAttribute('href', settings.productURL + settings.slug + '/reviews')
      }

      for(var i = 0; i < productLinks.length; i++) {
        productLinks.item(i).setAttribute('href', settings.productURL + settings.slug)
      }
    }

    /**
     * Review count styling
     */
    reviewCountStyling() {

      let reviewCount = document.getElementById(settings.containers.buttonText)
          reviewCount.style.display = (!settings.reviewShow) ? 'none' : 'block'
          reviewCount.style.color = settings.reviewColor
    }

    /**
     * Get review button text
     *
     * @return {string}
     */
    getReviewButtonText() {

      let text = settings.reviewText
      if (text == 'reviews' && this.productData.reviews.count == 1) text = 'review'

      return text
    }

    /**
     * Append markup to body
     *
     * @param {string} markup
     */
    appendMarkupToBody(markup) {

      const huntr = document.createElement('div')
            huntr.innerHTML = markup

      /* Landing page example */
      if (settings.exampleWidget) {
        document.getElementById(settings.containers.example).innerHTML = markup
      } else {
        document.body.appendChild(huntr)
      }
    }

    /**
     * Button markup
     *
     * @return {string}
     */
    buttonMarkup() {

       return '<div id="huntr-button">' +
                '<ul>' +
                  this.getButtonAvatars() +
                '</ul>' +
                '<span id="huntr-text" class="' + this.getReviewCountClass() + '">' +
                  '<em>' +
                    this.productData.reviews.count +
                  '</em> ' +
                  this.getReviewButtonText() +
                '</span>' +
              '</div>'
    }

    /**
     * Widget header markup
     *
     * @return {string}
     */
    widgetHeaderMarkup() {

       return '<div id="huntr-header">' +
                '<div class="huntr-choices">' +
                  '<a target="_blank" class="ph-review-link huntr-positive">' +
                    this.getSmiley('positive') +
                    '<span>' + this.productData.positive_votes + '</span>' +
                  '</a>' +
                  '<a target="_blank" class="ph-review-link huntr-neutral">' +
                    this.getSmiley('neutral') +
                    '<span>' + this.productData.neutral_votes + '</span>' +
                  '</a>' +
                  '<a target="_blank" class="ph-review-link huntr-negative">' +
                    this.getSmiley('negative') +
                    '<span>' + this.productData.negative_votes + '</span>' +
                  '</a>' +
                '</div>' +
                '<a target="_blank" class="ph-product-link huntr-cta huntr-upvote">' +
                  '<span>' + this.productData.upvotes + '</span>' +
                '</a>' +
                '<a target="_blank" class="ph-review-link huntr-cta huntr-review">' +
                  settings.ctaReviewText +
                '</a>' +
              '</div>'
    }

    /**
     * Widget reviews markup
     *
     * @return {string}
     */
    widgetReviewsMarkup() {

      const reviews = this.productData.reviews.list
      let markup = ''

      /* Loop reviews */
      for(var i = 0; i < reviews.length; i++) {

        markup += '<li>' +
                    '<div class="huntr-reaction positive">' +
                      this.getUserSmiley(reviews[i]) +
                    '</div>' +
                    '<div class="huntr-person">' +
                      '<img src="' + reviews[i].avatar_url + '" alt="Avatar">' +
                      '<a href="https://producthunt.com/@' + reviews[i].product_hunt_username + '" target="_blank">' +
                        reviews[i].user_name +
                      '</a>' +
                      reviews[i].user_title +
                    '</div>' +
                    '<div class="huntr-review">' +
                      '<p><strong>Pros:</strong> ' + reviews[i].pros + '</p>' +
                      '<p><strong>Cons:</strong> ' + reviews[i].cons + '</p>' +
                      '<p class="under">' +
                         reviews[i].review +
                      '</p>' +
                    '</div>' +
                  '</li>'
      }

      return markup
    }

  }

  export { WidgetMarkup as default}
