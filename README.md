# Gutenstrap Blocks - Bootstrap 4 blocks for Gutenberg WordPress editor.

<p align="center">
  <img width="128" height="128" src="https://ps.w.org/gutenstrap-blocks/assets/icon.svg" alt="Gutenstrap Blocks">
  <br>
  <br>
  <a href="https://wordpress.org/plugins/gutenstrap-blocks/advanced/">WordPress plugin page</a>
</p>
<br>

This plugin adds Bootstrap 4 components and grid layout to Gutenberg WordPress editor. It enhances editing experience focusing on making the most of library's documented features. Combine power of Gutenberg and Bootstrap to create a layout of any complexity with ease!

## Supported Bootstrap blocks and formats:
* **Container** - includes fluid container
* **Row** - includes flexbox vertical and horizontal alignment classes and no gutters class
* **Column** - allows to set equal sized columns, auto size, number column size and offset
* **Button** - theme color selector, outline and block styles, small and large sizes
* **Alert** - theme color selector, includes dismissible alerts and allows to nest other blocks
* **Badge** - theme color selector, includes pill style

*You can even nest rows!*

## Bootstrap library
CSS is included in the admin area to make editing in Gutenberg easier and styles are prefixed with `.bootstrap-styles` class. You can choose if you want to include to Bootstrap 4.3.1 on the front-end if you aren't using Bootstrap based theme.

You can customize Bootstrap styles in the editor. Prefix your styles with `.bootstrap-styles` class and include prefixed Bootstrap 4 css on admin side.

Example of how to prefix styles using SCSS:
```scss
.bootstrap-styles {
    @import '~bootstrap/scss/bootstrap';
}
```

## Requirements
* WordPress >= 5.2
* PHP >= 5.6

== Frequently Asked Questions ==
= Can I customize Bootstrap styles in the editor? =


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




This project was bootstrapped with [Create Guten Block](https://github.com/ahmadawais/create-guten-block).

Below you will find some information on how to run scripts.

>You can find the most recent version of this guide [here](https://github.com/ahmadawais/create-guten-block).

## 👉  `npm start`
- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

## 👉  `npm run build`
- Use to build production code for your block inside `dist` folder.
- Runs once and reports back the gzip file sizes of the produced code.

## 👉  `npm run eject`
- Use to eject your plugin out of `create-guten-block`.
- Provides all the configurations so you can customize the project as you want.
- It's a one-way street, `eject` and you have to maintain everything yourself.
- You don't normally have to `eject` a project because by ejecting you lose the connection with `create-guten-block` and from there onwards you have to update and maintain all the dependencies on your own.

---

###### Feel free to tweet and say 👋 at me [@MrAhmadAwais](https://twitter.com/mrahmadawais/)

[![npm](https://img.shields.io/npm/v/create-guten-block.svg?style=flat-square)](https://www.npmjs.com/package/create-guten-block) [![npm](https://img.shields.io/npm/dt/create-guten-block.svg?style=flat-square&label=downloads)](https://www.npmjs.com/package/create-guten-block)  [![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/ahmadawais/create-guten-block) [![Tweet for help](https://img.shields.io/twitter/follow/mrahmadawais.svg?style=social&label=Tweet%20@MrAhmadAwais)](https://twitter.com/mrahmadawais/) [![GitHub stars](https://img.shields.io/github/stars/ahmadawais/create-guten-block.svg?style=social&label=Stars)](https://github.com/ahmadawais/create-guten-block/stargazers) [![GitHub followers](https://img.shields.io/github/followers/ahmadawais.svg?style=social&label=Follow)](https://github.com/ahmadawais?tab=followers)
