=== Gutenstrap ===
Contributors: eolant
Tags: gutenberg, bootstrap, bootstrap 4, blocks, bootstrap blocks, grid, layout, components
Donate link: https://www.patreon.com/eolant
Requires at least: 5.2
Tested up to: 5.2
Requires PHP: 5.6
Stable tag: 1.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Collection of Bootstrap 4 blocks for Gutenberg WordPress editor.

== Description ==
Gutenstrap plugin adds Bootstrap 4 components to Gutenberg WordPress editor as blocks and formats.

== Supported blocks: ==
* Container
* Row
* Column
* Button
* Alert
* Badge

*Note that Bootstrap library is not supplied and have to be included in the theme*

== Requirements ==
* WordPress >= 5.2
* PHP >= 5.6

== Installation ==
Using CMS:
1. Go to "Plugins" → "Add New"
1. Search "Gutenstrap"
1. Click "Install Now"
1. Activate the plugin

Manual:
1. Go to "Plugins" → "Add New"
1. Click "Upload Plugin"
1. Select plugin file
1. Click "Install Now"
1. Activate the plugin

== Frequently Asked Questions ==
= Is bootstrap included on the front end? =
No, you will have to include it yourself or use Bootstrap 4 based theme.

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
1. Easily create your layout howhever complex you need.
2. Button component.
3. Alert component built in line with Bootstrap 4 documentation.

== Changelog ==
= 1.0 =
* Initial release.

== Upgrade Notice ==
= 1.0 =
Initial release.
