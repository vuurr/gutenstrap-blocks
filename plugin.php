<?php
/**
 * Plugin Name: Gutenstrap
 * Plugin URI: https://eolant.me/
 * Description: Gutenstrap - is a collection of Bootstrap 4 blocks for Gutenberg
 * Author: eolant
 * Author URI: https://eolant.me/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
