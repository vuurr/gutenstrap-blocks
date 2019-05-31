<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package WP Gutenstrap
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 */
function wp_gutenstrap_plugin_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	// wp_register_style(
	// 	'wp-gutenstrap-style-css', // Handle.
	// 	plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
	// 	array( 'wp-editor' ), // Dependency to include the CSS after it.
	// 	null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	// );

	// Register block editor script for backend.
	wp_register_script(
		'wp-gutenstrap-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-hooks', 'wp-components', 'wp-keycodes', 'wp-rich-text', 'wp-block-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'wp-gutenstrap-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	$blocks = array(
		'wp-gutenstrap/alert',
		'wp-gutenstrap/button',

		'wp-gutenstrap/container',
		'wp-gutenstrap/row',
		'wp-gutenstrap/column',
	);

	foreach ( $blocks as $block ) {
		register_block_type(
			$block, array(
				// Enqueue blocks.style.build.css on both frontend & backend.
				// 'style'         => 'wp-gutenstrap-style-css',
				// Enqueue blocks.build.js in the editor only.
				'editor_script' => 'wp-gutenstrap-block-js',
				// Enqueue blocks.editor.build.css in the editor only.
				'editor_style'  => 'wp-gutenstrap-block-editor-css',
			)
		);
	}
}

// Hook: Block assets.
add_action( 'init', 'wp_gutenstrap_plugin_block_assets' );

// Define category
function wp_gutenstrap_plugin_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'wp-gutenstrap',
				'title' => __( 'Gutenstrap', 'wp-gutenstrap' ),
			),
		)
	);
}
add_filter( 'block_categories', 'wp_gutenstrap_plugin_category', 10, 2);

// Load textdomain
function wp_gutenstrap_plugin_textdomain() {
	load_plugin_textdomain( 'wp-gutenstrap', false, basename( dirname( WP_GUTENSTRAP_PLUGIN_FILE ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'wp_gutenstrap_plugin_textdomain' );
