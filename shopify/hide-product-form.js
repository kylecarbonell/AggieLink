/**
 * Hide Shopify Product Form When Auction Widget Is Active
 *
 * This script hides the default Shopify product form elements
 * (quantity selector, "Add to cart" button, and payment options)
 * when an auction widget is active on a product page.
 *
 * Target theme: Empire 12.2.1
 * Target element: .product-form__action-wrapper
 *
 * Usage: Include this script in the Shopify theme (e.g., via a <script> tag
 * in theme.liquid or a Shopify ScriptTag) so it runs on product pages.
 */
(function () {
  'use strict';

  /**
   * Selectors used to detect an active auction widget on the page.
   * Add or modify selectors here if the auction widget markup changes.
   */
  var AUCTION_WIDGET_SELECTORS = [
    '[data-auction-widget]',
    '[data-auction]',
    '.auction-widget',
    '.auction-container',
    '#auction-widget'
  ];

  /**
   * The Empire theme selector for the product form action wrapper that
   * contains the quantity selector, "Add to cart" button, and payment buttons.
   */
  var PRODUCT_FORM_SELECTOR = '.product-form__action-wrapper';

  /**
   * Check whether an auction widget is present in the DOM.
   * Returns the first matching auction widget element, or null.
   */
  function findAuctionWidget() {
    for (var i = 0; i < AUCTION_WIDGET_SELECTORS.length; i++) {
      var el = document.querySelector(AUCTION_WIDGET_SELECTORS[i]);
      if (el) {
        return el;
      }
    }
    return null;
  }

  /**
   * Hide all product form action wrappers on the page.
   * Returns true if at least one element was hidden.
   */
  function hideProductForm() {
    var forms = document.querySelectorAll(PRODUCT_FORM_SELECTOR);
    var hidden = false;

    for (var i = 0; i < forms.length; i++) {
      if (forms[i].style.display !== 'none') {
        forms[i].style.display = 'none';
        hidden = true;
      }
    }

    return hidden;
  }

  /**
   * Main routine: if an auction widget is detected, hide the product form.
   * Returns true if the product form was successfully hidden.
   */
  function applyHide() {
    var auctionWidget = findAuctionWidget();
    if (!auctionWidget) {
      return false;
    }

    return hideProductForm();
  }

  /**
   * Observe DOM mutations so we catch auction widgets injected after
   * the initial page load (e.g., loaded asynchronously by an app).
   */
  function observeDOM() {
    if (typeof MutationObserver === 'undefined') {
      return;
    }

    var observer = new MutationObserver(function () {
      if (applyHide()) {
        // Once successfully hidden, we can stop observing.
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Safety timeout: stop observing after 30 seconds to avoid
    // indefinite observation if no auction widget ever appears.
    setTimeout(function () {
      observer.disconnect();
    }, 30000);
  }

  /**
   * Initialize: try to hide immediately, and if not yet possible,
   * set up a DOM observer to catch dynamically loaded widgets.
   */
  function init() {
    if (applyHide()) {
      // Auction widget was already present; product form hidden.
      return;
    }

    // Widget not yet in the DOM — observe for future additions.
    observeDOM();
  }

  // Run when the DOM is ready.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
