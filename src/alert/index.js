/**
 * BLOCK: Bootstrap Alert
 *
 */

//  Import CSS
import './editor.scss'
import './style.scss'

// Global import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'

// Import common
import { themeTypes, SupportMe } from '../common.js'

const { __ } = wp.i18n
const { applyFilters } = wp.hooks
const { registerBlockType } = wp.blocks
const {
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	InnerBlocks,
} = wp.editor
const {
	PanelBody,
	SelectControl,
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
		themeType = themeTypes[0].value,
		alignment,
		dismissible,
	} = props.attributes

	return classnames( [
		className,
		'alert',
		{ [ `alert-${ themeType }` ]: !! themeType },
	], applyFilters( 'wp-gutenstrap.alert.classes', {
		[ `text-${ alignment }` ]: !! alignment,
		'alert-dismissible': dismissible,
		'fade': dismissible,
		'show': dismissible,
	}, props ) )
}

/**
 * Register: Bootstrap Alert.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered otherwise `undefined`.
 */
registerBlockType( 'wp-gutenstrap/alert', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'GS Alert', 'wp-gutenstrap' ),
	description: __( 'Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.', 'wp-gutenstrap' ),
	icon: <FontAwesomeIcon icon={ faExclamationTriangle } />,
	category: 'wp-gutenstrap', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Gutenstrap', 'wp-gutenstrap' ),
		__( 'WP Gutenstrap', 'wp-gutenstrap' ),
		__( 'Bootstrap', 'wp-gutenstrap' ),
		__( 'Alert', 'wp-gutenstrap' ),
	],
	supports: {
		className: false,
	},

	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: '.alert-content',
		},
		themeType: {
			type: 'string',
		},
		alignment: {
			type: 'string',
		},
		dismissible: {
			type: 'boolean',
		},
		allowNesting: {
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
			themeType = themeTypes[0].value,
			dismissible,
			allowNesting,
		} = props.attributes

		const classes = getClasses( props )

		return (
			<div class="bootstrap-styles">
				<div className={ classes } role="alert">
					<InspectorControls>
						<PanelBody
							initialOpen={ true }
							title={ __( 'Settings', 'wp-gutenstrap' ) }
						>
							<SelectControl
								label={ __( 'Type', 'wp-gutenstrap' ) }
								value={ themeType }
								options={ themeTypes.map( ( { value, label } ) => ( {
									value,
									label,
								} ) ) }
								onChange={ ( value ) => setAttributes( { themeType: value } ) }
							/>

							<ToggleControl
								label={ __( 'Dismissible', 'wp-gutenstrap' ) }
								checked={ dismissible }
								onChange={ () => setAttributes( { dismissible: ! dismissible } ) }
							/>

							<ToggleControl
								label={ __( 'Allow nesting', 'wp-gutenstrap' ) }
								checked={ allowNesting }
								onChange={ () => setAttributes( { allowNesting: ! allowNesting } ) }
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

					<div class="alert-content">
						{ allowNesting ? (
								<InnerBlocks />
							) : (
								<RichText
									value={ content }
									placeholder={ __( 'Enter message here…', 'wp-gutenstrap' ) }
									keepPlaceholderOnFocus
									onChange={ ( value ) => setAttributes( { content: value } ) }
								/>
							)
						}
					</div>

					{ dismissible && (
						<button type="button" class="close" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					) }
				</div>
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
		const {
			content,
			dismissible,
			allowNesting,
		} = props.attributes

		const classes = getClasses( props )

		return (
			<div className={ classes } role="alert">
				<div class="alert-content">
					{ allowNesting ? (
							<InnerBlocks.Content />
						) : (
							<RichText.Content
								value={ content }
							/>
						)
					}
				</div>

				{ dismissible && (
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				) }
			</div>
		)
	},
} )
