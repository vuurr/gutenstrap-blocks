<?php
/**
 * Plugin Name: Gutenstrap
 * Plugin URI: https://eolant.me/
 * Description: Collection of Bootstrap 4 blocks for Gutenberg WordPress Editor
 * Author: eolant
 * Author URI: https://eolant.me/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
