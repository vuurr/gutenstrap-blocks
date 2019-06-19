=== Gutenstrap Blocks ===
Contributors: eolant
Tags: gutenstrap, gutenberg, bootstrap, gutenberg bootstrap, bootstrap 4, blocks, grid
Donate link: https://www.patreon.com/eolant
Requires at least: 5.2
Tested up to: 5.2.1
Requires PHP: 5.6
Stable tag: 1.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Collection of Bootstrap 4 blocks and formats for Gutenberg WordPress editor.

== Description ==
This plugin adds Bootstrap 4 components and grid layout to Gutenberg WordPress editor. It enhances editing experience focusing on making the most of library's documented features. Combine power of Gutenberg and Bootstrap to create a layout of any complexity with ease!

== Supported Bootstrap blocks and formats: ==
* **Container** - includes fluid container
* **Row** - includes flexbox vertical and horizontal alignment classes and no gutters class
* **Column** - allows to set equal sized columns, auto size, number column size and offset
* **Button** - theme color selector, outline and block styles, small and large sizes
* **Alert** - theme color selector, includes dismissible alerts and allows to nest other blocks
* **Badge** - theme color selector, includes pill style

*You can even nest rows!*

== Bootstrap library ==
CSS is included in the admin area to make editing in Gutenberg easier and styles are prefixed with `.bootstrap-styles` class. You can choose if you want to include to Bootstrap 4.3.1 on the front-end if you aren't using Bootstrap based theme.

== Requirements ==
* WordPress >= 5.2
* PHP >= 5.6

== Installation ==
Using CMS:
1. Go to "Plugins" → "Add New"
1. Search "Gutenstrap Blocks"
1. Click "Install Now"
1. Activate the plugin

Manual:
1. Go to "Plugins" → "Add New"
1. Click "Upload Plugin"
1. Select plugin file
1. Click "Install Now"
1. Activate the plugin

== Frequently Asked Questions ==
= Can I customize Bootstrap styles in the editor? =
Yes. Prefix your styles with `.bootstrap-styles` class and include prefixed Bootstrap 4 css on admin side.

Example of how to prefix styles using SASS:
```
.bootstrap-styles {
    @import '~bootstrap/scss/bootstrap';
}
```
= Will there be more blocks? =
Yes! Anything is possible with your support.

== Screenshots ==
1. Easily create your grid layout however complex you need.
2. Button component.
3. Alert component built in line with Bootstrap 4 documentation.

== Changelog ==
= 1.0 =
* Initial release.

== Upgrade Notice ==
= 1.0 =
Initial release.
