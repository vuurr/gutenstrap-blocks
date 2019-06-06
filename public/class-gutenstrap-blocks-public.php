<?php
/**
 * The public-facing functionality of the plugin.
 *
 * @since   1.0.0
 * @package Gutenstrap Blocks
 */
class GutenstrapBlocksPublic {
	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Options cache.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      array     $options
	 */
	private $options;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param    string    $plugin_name  The name of this plugin.
	 * @param    string    $version      The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {
		$this->plugin_name = $plugin_name;
		$this->version = $version;

		$this->options = get_option( 'gutenstrap_blocks_settings' );
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function register_styles() {
		/**
		 * Register block styles for both frontend + backend.
		 */
		// wp_register_style(
		// 	$this->plugin_name . '-style-css', // Handle.
		// 	plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		// 	array( 'wp-editor' ),
		// 	$this->version
		// );
	}

	/**
	 * Enqueue the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {
		if ( $this->options !== false && $this->options['include_bootstrap'] === GutenstrapBlocksAdmin::BOOTSTRAP_LIBRARY_INCLUDE && ! wp_style_is( $this->options['bootstrap_library'] ) ) {
			$library = GutenstrapBlocksAdmin::bootstrap_libraries()[ $this->options['bootstrap_library'] ];
			wp_enqueue_style( $this->options['bootstrap_library'], $library['css'], array(), $this->version );
		}
	}

	/**
	 * Enqueue the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {
		// wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/gutenstrap-blocks-public.js', array( 'jquery' ), $this->version, false );
	}
}
