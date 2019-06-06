<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @since   1.0.0
 * @package Gutenstrap Blocks
 */
class GutenstrapBlocksAdmin {
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
	 * Constants
	 */
	const BOOTSTRAP_LIBRARY_INCLUDE = 'yes';
	const BOOTSTRAP_LIBRARY_DONT_INCLUDE = 'no';

	/**
	 * Default options.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      array     $default_options
	 */
	private $default_options = array(
		'include_bootstrap' => self::BOOTSTRAP_LIBRARY_DONT_INCLUDE,
		'bootstrap_library' => 'bootstrap-4.3.1',
	);

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

		$this->check_options();
	}

	/**
	 * Check plugin options and set defaults if empty
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function check_options() {
		$this->options = get_option( 'gutenstrap_blocks_settings' );

		if ( $this->options === false ) {
			update_option( 'gutenstrap_blocks_settings', $this->default_options );
			$this->options = $this->default_options;
		}
	}


	/**
	 * Get available bootstrap libraries.
	 *
	 * @since    1.0.0
	 * @return   array
	 */
	public static function bootstrap_libraries() {
		return apply_filters( 'gutenstrap_blocks_bootstrap_libraries', array(
			'bootstrap-4.3.1' => array(
				'title' => __( 'Bootstrap 4.3.1' ),
				'css' => plugins_url( 'libs/bootstrap-4.3.1/css/bootstrap.min.css', dirname( __FILE__ ) ),
			),
		) );
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function register_styles() {
		/**
		 * Register block editor styles for backend.
		 */
		wp_register_style(
			$this->plugin_name . '-block-editor-css', // Handle.
			plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
			array( 'wp-edit-blocks' ),
			$this->version
		);
	}

	/**
	 * Enqueue the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/gutenstrap-blocks-admin.css', array(), $this->version );
	}

	/**
	 * Regsiter the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function register_scripts() {
		/**
		 * Register block editor script for backend.
		 */
		wp_register_script(
			$this->plugin_name . '-block-js', // Handle.
			plugins_url( 'dist/blocks.build.js', dirname( __FILE__ ) ),
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-hooks', 'wp-components', 'wp-keycodes', 'wp-rich-text', 'wp-block-editor' ),
			$this->version,
			true // Enqueue the script in the footer.
		);
	}

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.0.0
	 */
	public function register_blocks() {
		$blocks = array(
			'alert',
			'button',

			'container',
			'row',
			'column',
		);

		foreach ( $blocks as $block ) {
			register_block_type(
				$this->plugin_name . '/' . $block, array(
					// Enqueue blocks.style.build.css on both frontend & backend.
					// 'style'         => $this->plugin_name . '-style-css',
					// Enqueue blocks.build.js in the editor only.
					'editor_script' => $this->plugin_name . '-block-js',
					// Enqueue blocks.editor.build.css in the editor only.
					'editor_style'  => $this->plugin_name . '-block-editor-css',
				)
			);
		}
	}

	/**
	 * Add blocks category.
	 *
	 * @param array $categories Array of block categories.
	 * @since 1.0.0
	 */
	public function add_blocks_category( $categories ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug' => $this->plugin_name,
					'title' => __( 'Gutenstrap', $this->plugin_name ),
				),
			)
		);
	}

	/**
	 * Add admin menu item to manage plugin
	 *
	 * @since 1.0.0
	 */
	public function add_admin_menu() {
		add_submenu_page(
			'options-general.php',
			__( 'Gutenstrap Blocks', $this->plugin_name ),
			__( 'Gutenstrap Blocks', $this->plugin_name ),
			'manage_options',
			'gutenstrap_blocks',
			array( $this, 'options_page' )
		);
	}

	/**
	 * Add plugin action links
	 *
	 * @param array $links Existing plugin action links.
	 * @since 1.0.0
	 */
	public function add_plugin_action_links( $links ) {
		return array_merge(
			$links,
			array(
				'<a href="' . admin_url( 'options-general.php?page=gutenstrap_blocks' ) . '">' . __( 'Settings' ) . '</a>',
			)
		);
	}

	/**
	 * Settings init
	 *
	 * @since 1.0.0
	 */
	public function settings_init() {
		register_setting( 'gutenstrapBlocksPage', 'gutenstrap_blocks_settings', array( $this, 'settings_sanitize' ) );

		add_settings_section(
			'gutenstrap_blocks_gutenstrapBlocksPage_section',
			null,
			array( $this, 'settings_section' ),
			'gutenstrapBlocksPage'
		);

		add_settings_field(
			'gutenstrap_blocks_include_bootstrap',
			__( 'Do you wish to include Bootstrap library?', $this->plugin_name ),
			array( $this, 'settings_field_include_bootstrap' ),
			'gutenstrapBlocksPage',
			'gutenstrap_blocks_gutenstrapBlocksPage_section'
		);

		add_settings_field(
			'gutenstrap_blocks_bootstrap_library',
			__( 'Bootstrap library', $this->plugin_name ),
			array( $this, 'settings_field_bootstrap_library' ),
			'gutenstrapBlocksPage',
			'gutenstrap_blocks_gutenstrapBlocksPage_section'
		);
	}

	/**
	 * Sanitize settings before saving
	 *
	 * @param  array $input   Input options
	 * @return array          Sanitized options
	 */
	public function settings_sanitize( $input ) {
		$options = array();

		foreach ( $input as $key => $value ) {
			$valid = false;

			if ( $key === 'include_bootstrap' ) {
				$valid = in_array( $value, array( self::BOOTSTRAP_LIBRARY_INCLUDE, self::BOOTSTRAP_LIBRARY_DONT_INCLUDE ) );
			}

			if ( $key === 'bootstrap_library' ) {
				$valid = in_array( $value, array_keys( self::bootstrap_libraries() ) );
			}

			$options[ $key ] = $valid ? $value : $this->default_options[ $key ];
		}

		return $options;
	}

	/**
	 * Settings section description
	 *
	 * @since 1.0.0
	 */
	public function settings_section() {
	}

	/**
	 * Settings field include Bootstrap
	 *
	 * @since 1.0.0
	 */
	public function settings_field_include_bootstrap() {
		?>
		<label><input type="radio" name="gutenstrap_blocks_settings[include_bootstrap]" <?php checked( $this->options['include_bootstrap'], self::BOOTSTRAP_LIBRARY_INCLUDE ); ?> value="<?php echo self::BOOTSTRAP_LIBRARY_INCLUDE; ?>"> <?php _e( 'Yes, current theme is without Bootstrap support', $this->plugin_name ) ?></label><br>
		<label><input type="radio" name="gutenstrap_blocks_settings[include_bootstrap]" <?php checked( $this->options['include_bootstrap'], self::BOOTSTRAP_LIBRARY_DONT_INCLUDE ); ?> value="<?php echo self::BOOTSTRAP_LIBRARY_DONT_INCLUDE; ?>"> <?php _e( 'No, current theme supports Bootstrap', $this->plugin_name ) ?></label>
		<?php
	}

	/**
	 * Settings field Bootstrap library
	 *
	 * @since 1.0.0
	 */
	public function settings_field_bootstrap_library() {
		?>
		<select name="gutenstrap_blocks_settings[bootstrap_library]">
			<?php foreach ( self::bootstrap_libraries() as $slug => $library ) : ?>
				<option value="<?php echo $slug; ?>" data-url="<?php echo $library['css']; ?>" <?php selected( $this->options['bootstrap_library'], $slug ); ?>><?php echo $library['title']; ?></option>
			<?php endforeach; ?>
		</select>
		<?php
	}

	/**
	 * Options page
	 *
	 * @since 1.0.0
	 */
	public function options_page() {
		?>
		<div class="wrap">
			<h1>Gutenstrap Blocks</h1>

			<div class="gutenstrap-blocks">
				<div class="gutenstrap-blocks__left">
					<form action="options.php" method="POST">
						<?php
						settings_fields( 'gutenstrapBlocksPage' );
						do_settings_sections( 'gutenstrapBlocksPage' );
						submit_button();
						?>
					</form>
				</div>

				<div class="gutenstrap-blocks__right">
					<div class="gutenstrap-blocks__widget gutenstrap-blocks__widget--alert">
						Like this plugin? Consider supporting it on <a href="https://www.patreon.com/eolant" target="_blank" rel="noopener noreferrer">Patreon</a> or donate via <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=R7JUDUQ492BUU&source=url" target="_blank" rel="noopener noreferrer">PayPal</a>.
					</div>
				</div>
			</div>
		</div>
		<?php
	}
}
