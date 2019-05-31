<?php
/**
 * Plugin Name: WP Gutenstrap
 * Plugin URI: https://wordpress.org/plugins/wp-gutenstrap/
 * Description: Collection of Bootstrap 4 blocks for Gutenberg WordPress editor.
 * Author: Vitaly Kasymov
 * Author URI: https://eolant.me/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: wp-gutenstrap
 * Domain Path: /languages
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define GUTENSTRAP_PLUGIN_FILE
define( 'WP_GUTENSTRAP_PLUGIN_FILE', __FILE__ );

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'lib/init.php';
