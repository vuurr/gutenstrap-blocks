/**
 * BLOCK: Bootstrap Row
 *
 */

//  Import CSS
import './editor.scss'

// Global import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
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
	SelectControl,
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
		nogutters,
		alignItems,
		justifyContent,
	} = props.attributes

	return classnames( [
		className,
		'row',
	], applyFilters( 'wp-gutenstrap.row.classes', {
		[ `text-${ alignment }` ]: !! alignment,
		[ `align-items-${ alignItems }` ]: !! alignItems,
		[ `justify-content-${ justifyContent }` ]: !! justifyContent,
		'no-gutters': nogutters,
	}, props ) )
}

/**
 * Register: Bootstrap Row.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered otherwise `undefined`.
 */
registerBlockType( 'wp-gutenstrap/row', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'GS Row', 'wp-gutenstrap' ),
	description: __( 'Rows are wrappers for columns.', 'wp-gutenstrap' ),
	icon: <FontAwesomeIcon icon={ faMinus } />,
	category: 'wp-gutenstrap', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Gutenstrap', 'wp-gutenstrap' ),
		__( 'WP Gutenstrap', 'wp-gutenstrap' ),
		__( 'Bootstrap', 'wp-gutenstrap' ),
		__( 'Row', 'wp-gutenstrap' ),
	],
	supports: {
		className: false,
	},

	attributes: {
		alignment: {
			type: 'string',
		},
		nogutters: {
			type: 'boolean',
		},
		alignItems: {
			type: 'string',
		},
		justifyContent: {
			type: 'string',
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
			nogutters,
			alignItems,
			justifyContent,
		} = props.attributes

		return (
			<div class="wp-gutenstrap-block-row" style={ { textAlign: alignment } }>
				<InspectorControls>
					<PanelBody
						initialOpen={ true }
						title={ __( 'Settings', 'wp-gutenstrap' ) }
					>
						<SelectControl
							label={ __( 'Vertical alignment', 'wp-gutenstrap' ) }
							value={ alignItems }
							options={ [
								{ value: null, label: __( 'None', 'wp-gutenstrap' ) },
								{ value: 'start', label: __( 'Start', 'wp-gutenstrap' ) },
								{ value: 'center', label: __( 'Center', 'wp-gutenstrap' ) },
								{ value: 'end', label: __( 'End', 'wp-gutenstrap' ) },
							] }
							onChange={ ( value ) => setAttributes( { alignItems: value } ) }
						/>

						<SelectControl
							label={ __( 'Horizontal alignment', 'wp-gutenstrap' ) }
							value={ justifyContent }
							options={ [
								{ value: null, label: __( 'None', 'wp-gutenstrap' ) },
								{ value: 'start', label: __( 'Start', 'wp-gutenstrap' ) },
								{ value: 'center', label: __( 'Center', 'wp-gutenstrap' ) },
								{ value: 'end', label: __( 'End', 'wp-gutenstrap' ) },
								{ value: 'around', label: __( 'Space around', 'wp-gutenstrap' ) },
								{ value: 'between', label: __( 'Space between', 'wp-gutenstrap' ) },
							] }
							onChange={ ( value ) => setAttributes( { justifyContent: value } ) }
						/>

						<ToggleControl
							label={ __( 'No gutters', 'wp-gutenstrap' ) }
							checked={ nogutters }
							onChange={ () => setAttributes( { nogutters: ! nogutters } ) }
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
