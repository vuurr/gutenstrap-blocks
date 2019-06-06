<?php
/**
 * Plugin Name: Gutenstrap Blocks
 * Plugin URI: https://wordpress.org/plugins/gutenstrap-blocks/
 * Description: Collection of Bootstrap 4 blocks for Gutenberg WordPress editor.
 * Author: Vitaly Kasymov
 * Author URI: https://eolant.me/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: gutenstrap-blocks
 * Domain Path: /languages
 */

// Exit if accessed directly.
if ( ! defined( 'WPINC' ) ) {
	exit;
}

/**
 * Currently plugin version.
 */
define( 'GUTENSTRAP_BLOCKS_VERSION', '1.0.0' );

/**
 * Plugin basename.
 */
define( 'GUTENSTRAP_BLOCKS_BASENAME', plugin_basename( __FILE__ ) );

/**
 * The core plugin class.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-gutenstrap-blocks.php';

$plugin = new GutenstrapBlocks();
$plugin->run();
