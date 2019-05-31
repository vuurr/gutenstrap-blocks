/**
 * BLOCK: Bootstrap Container
 *
 */

//  Import CSS
import './editor.scss'

// Global import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import classnames from 'classnames'

// Import common
import { SupportMe } from '../common.js'

const { __ } = wp.i18n
const { applyFilters } = wp.hooks
const { registerBlockType } = wp.blocks
const {
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	InnerBlocks,
} = wp.editor
const {
	PanelBody,
	ToggleControl,
} = wp.components

/**
 * Create list of classes for class property
 *
 * @param  {Object}  props Block properties
 * @return {string}
 */
function getClasses( props ) {
	const {
		className,
	} = props

	const {
		alignment,
		isFluid,
	} = props.attributes

	return classnames( [
		className,
		{
			'container': ! isFluid,
			'container-fluid': isFluid
		},
	], applyFilters( 'wp-gutenstrap.container.classes', {
		[ `text-${ alignment }` ]: !! alignment
	}, props ) )
}

/**
 * Register: Bootstrap Container.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered otherwise `undefined`.
 */
registerBlockType( 'wp-gutenstrap/container', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'GS Container', 'wp-gutenstrap' ),
	description: __( 'Provide a means to center and horizontally pad your site’s contents.', 'wp-gutenstrap' ),
	icon: <FontAwesomeIcon icon={ faSquare } />,
	category: 'wp-gutenstrap', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Gutenstrap', 'wp-gutenstrap' ),
		__( 'WP Gutenstrap', 'wp-gutenstrap' ),
		__( 'Bootstrap', 'wp-gutenstrap' ),
		__( 'Container', 'wp-gutenstrap' ),
	],
	supports: {
		className: false,
	},

	attributes: {
		content: {
			type: 'array',
			source: 'children',
		},
		alignment: {
			type: 'string',
		},
		isFluid: {
			type: 'boolean',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		const {
			setAttributes,
			className,
		} = props

		const {
			content,
			alignment,
			isFluid,
		} = props.attributes

		return (
			<div class="wp-gutenstrap-block-container" style={ { textAlign: alignment } }>
				<InspectorControls>
					<PanelBody
						initialOpen={ true }
						title={ __( 'Settings', 'wp-gutenstrap' ) }
					>
						<ToggleControl
							label={ __( 'Fluid', 'wp-gutenstrap' ) }
							checked={ isFluid }
							onChange={ () => setAttributes( { isFluid: ! isFluid } ) }
						/>

						<SupportMe />
					</PanelBody>
				</InspectorControls>
				<BlockControls>
					<AlignmentToolbar
						value={ alignment }
						onChange={ ( value ) => setAttributes( { alignment: value } ) }
					/>
				</BlockControls>

				<InnerBlocks />
			</div>
		)
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		const classes = getClasses( props )

		return (
			<div className={ classes }>
				<InnerBlocks.Content />
			</div>
		)
	},
} )
