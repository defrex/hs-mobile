// Copyright 2007 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Utilities for adding, removing and setting ARIA roles
 * as defined by W3C ARIA Working Draft:
 *     http://www.w3.org/TR/2008/WD-wai-aria-20080806/
 * All modern browsers have some form of ARIA support, so no browser checks are
 * performed when adding ARIA to components.
 *
 */
goog.provide('goog.dom.a11y');
goog.provide('goog.dom.a11y.Role');
goog.provide('goog.dom.a11y.State');

goog.require('goog.dom');
goog.require('goog.userAgent');


/**
 * Enumeration of ARIA states.
 * More will be added later.
 * @enum {string}
 */
goog.dom.a11y.State = {
  // ARIA state for setting the currently active descendant of an element.
  ACTIVEDESCENDANT: 'activedescendant',
  // ARIA state to specify how input completion is provided.
  AUTOCOMPLETE: 'autocomplete',
  // ARIA state for a checked item.
  CHECKED: 'checked',
  // ARIA state for a disabled item.
  DISABLED: 'disabled',
  // ARIA state for setting whether the element like a tree node is expanded.
  EXPANDED: 'expanded',
  // ARIA state for whether the element has a popup
  HASPOPUP: 'haspopup',
  // ARIA state for setting the element which labels another element.
  LABELLEDBY: 'labelledby',
  // ARIA state for setting the level of an element in the hierarchy
  LEVEL: 'level',
  // ARIA state for a pressed item.
  PRESSED: 'pressed',
  // ARIA state for setting the currently selected item in the list.
  SELECTED: 'selected',
  // ARIA state for slider maximum value.
  VALUEMAX: 'valuemax',
  // ARIA state for slider minimum value.
  VALUEMIN: 'valuemin',
  // ARIA state for slider active value.
  VALUENOW: 'valuenow',
  // ARIA state for slider active value represented as text.
  VALUETEXT: 'valuetext'
};


/**
 * Enumeration of ARIA roles.
 * @enum {string}
 */
goog.dom.a11y.Role = {
  // ARIA role for a button element.
  BUTTON: 'button',
  // ARIA role for a checkbox button element.
  CHECKBOX: 'checkbox',
  // ARIA role for a combobox element.
  COMBOBOX: 'combobox',
  // ARIA role for a dialog element.
  DIALOG: 'dialog',
  // ARIA role for link.
  LINK: 'link',
  // ARIA role for listbox.
  LISTBOX: 'listbox',
  // ARIA role for popup menu, submenu elements etc.
  MAIN: 'main',
  // ARIA role for main content in a document.
  MENU: 'menu',
  // ARIA role for a menubar element containing menu elements.
  MENUBAR: 'menubar',
  // ARIA role for menu item elements.
  MENU_ITEM: 'menuitem',
  // ARIA role for a checkbox box element inside a menu.
  MENU_ITEM_CHECKBOX: 'menuitemcheckbox',
  // ARIA role for a radio button element inside a menu.
  MENU_ITEM_RADIO: 'menuitemradio',
  // ARIA role for option items, generally used with a parent of listbox.
  NAVIGATION: 'navigation',
  // ARIA role for a collection of links suitable for use when navigating
  // the document or related documents.
  OPTION: 'option',
  // ARIA role for a group of elements like a group of radio buttons,
  // a form, etc.
  GROUP: 'group',
  // ARIA role for a slider.
  SLIDER: 'slider',
  // ARIA role for a tab button.
  TAB: 'tab',
  // ARIA role for a tab bar (i.e. a list of tab buttons).
  TAB_LIST: 'tablist',
  // ARIA role for a tab page (i.e. the element holding tab contents).
  TAB_PANEL: 'tabpanel',
  // ARIA role for a toolbar element.
  TOOLBAR: 'toolbar'
};


/**
 * Sets the role of an element.
 * @param {Element} element DOM node to set role of.
 * @param {string} roleName role name(s).
 */
goog.dom.a11y.setRole = function(element, roleName) {
  element.setAttribute('role', roleName);
  element.roleName = roleName;
};


/**
 * Gets role of an element.
 * @param {Element} element DOM node to get role of.
 * @return {string} rolename.
 */
goog.dom.a11y.getRole = function(element) {
  return element.roleName || '';
};


/**
 * Sets the state of an element.
 * @param {Element} element DOM node where we set state.
 * @param {string} state State attribute being set. Automatically adds prefix
 *     'aria-' to the state name.
 * @param {string|boolean|number} value Value for the state attribute.
 */
goog.dom.a11y.setState = function(element, state, value) {
  element.setAttribute('aria-' + state, value);
};


/**
 * Gets value of specified state property.
 * @param {Element} element DOM node to get state from.
 * @param {string} stateName State name.
 * @return {string} Value of the state attribute.
 */
goog.dom.a11y.getState = function(element, stateName) {
  var attrb =
      /** @type {string|number|boolean} */(element.getAttribute('aria-' +
          stateName));
  // Check for multiple representations -  attrb might
  // be a boolean or a string
  if ((attrb === true) || (attrb === false)) {
    return attrb ? 'true' : 'false';
  } else if (!attrb) {
    return '';
  } else {
    return String(attrb);
  }
};


/**
 * Gets the activedescendant of the given element.
 * @param {Element} element DOM node to get activedescendant from.
 * @return {Element} DOM node of the activedescendant.
 */
goog.dom.a11y.getActiveDescendant = function(element) {
  var id = goog.dom.a11y.getState(
      element, goog.dom.a11y.State.ACTIVEDESCENDANT);
  return goog.dom.getOwnerDocument(element).getElementById(id);
};


/**
 * Sets the activedescendant value for an element.
 * @param {Element} element DOM node to set activedescendant to.
 * @param {Element} activeElement DOM node being set as activedescendant.
 */
goog.dom.a11y.setActiveDescendant = function(element, activeElement) {
  goog.dom.a11y.setState(element, goog.dom.a11y.State.ACTIVEDESCENDANT,
      activeElement ? activeElement.id : '');
};
