/**
 * BLOCK: Bootstrap Button
 *
 */

//  Import CSS
import './editor.scss'

// Global import
import classnames from 'classnames'

// Import common
import { themeTypes, ButtonGroupSelect, SupportMe } from '../common.js'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { applyFilters } = wp.hooks
const {
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	URLInput,
} = wp.editor
const {
	PanelBody,
	SelectControl,
	ToggleControl,
	Path,
	SVG,
	Dashicon,
	IconButton,
} = wp.components

const sizes = applyFilters( 'wp-gutenstrap.button.sizes', [
	{ name: 'sm', title: __( 'Small', 'wp-gutenstrap' ) },
	{ title: __( 'Normal', 'wp-gutenstrap' ) },
	{ name: 'lg', title: __( 'Large', 'wp-gutenstrap' ) },
] )

/**
 * Filter block content
 *
 * @param  {string}  content
 * @return {string}
 */
function filterContent( content ) {
	content = applyFilters( 'wp-gutenstrap.button.content', content )

	return content
}

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
		outline,
		block,
		size,
	} = props.attributes

	return classnames( [
		className,
		'btn',
		{ [ `btn-${ outline ? 'outline-' : '' }${ themeType }` ]: !! themeType },
	], applyFilters( 'wp-gutenstrap.button.classes', {
		'btn-block': block,
		[ `btn-${ size }` ]: !! size
	}, props ) )
}

/**
 * Register: Bootstrap Button.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered otherwise `undefined`.
 */
registerBlockType( 'wp-gutenstrap/button', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'GS Button', 'wp-gutenstrap' ),
	description: __( 'Use Bootstrap’s custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.', 'wp-gutenstrap' ),
	icon: <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><Path d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z" /></SVG>,
	category: 'wp-gutenstrap', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Gutenstrap', 'wp-gutenstrap' ),
		__( 'WP Gutenstrap', 'wp-gutenstrap' ),
		__( 'Bootstrap', 'wp-gutenstrap' ),
		__( 'Button', 'wp-gutenstrap' ),
	],
	supports: {
		className: false,
	},

	attributes: {
		text: {
			type: 'string',
			source: 'html',
			selector: 'a',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
		},
		title: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'title',
		},
		rel: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'rel',
		},
		themeType: {
			type: 'string',
		},
		alignment: {
			type: 'string',
		},
		size: {
			type: 'string',
		},
		outline: {
			type: 'boolean',
		},
		block: {
			type: 'boolean',
		},
		blank: {
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
			isSelected,
		} = props

		const {
			text,
			url,
			alignment,
			themeType = themeTypes[0].value,
			outline,
			block,
			size,
			blank,
		} = props.attributes

		const classes = getClasses( props )

		return (
			<div class="bootstrap-styles" style={ { textAlign: alignment } }>
				<div className={ classnames( 'wp-gutenstrap-block-button', { 'btn-block': !! block, } ) }>
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
								label={ __( 'Outline', 'wp-gutenstrap' ) }
								checked={ outline }
								onChange={ () => setAttributes( { outline: ! outline } ) }
							/>

							<ToggleControl
								label={ __( 'Block', 'wp-gutenstrap' ) }
								checked={ block }
								onChange={ () => setAttributes( { block: ! block } ) }
							/>

							<ButtonGroupSelect
								label={ __( 'Size', 'wp-gutenstrap' ) }
								value={ size }
								options={ sizes }
								onChange={ ( value ) => setAttributes( { size: value } ) }
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

					<RichText
						placeholder={ __( 'Add text…', 'wp-gutenstrap' ) }
						value={ text }
						onChange={ ( value ) => setAttributes( { text: filterContent( value ) } ) }
						formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
						className={ classes }
						keepPlaceholderOnFocus
					/>
				</div>

				{ isSelected && (
					<form
						className="block-library-button__inline-link"
						onSubmit={ ( event ) => event.preventDefault() }
					>
						<Dashicon icon="admin-links" />
						<URLInput
							value={ url }
							onChange={ ( value ) => setAttributes( { url: value } ) }
						/>
						<IconButton icon="editor-break" label={ __( 'Apply', 'wp-gutenstrap' ) } type="submit" />

						<div class="wp-gutenstrap-block-button__inline-field">
							<ToggleControl
								label={ __( 'Open in New Tab', 'wp-gutenstrap' ) }
								checked={ blank }
								onChange={ () => setAttributes( { blank: ! blank } ) }
							/>
						</div>
					</form>
				) }
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
			text,
			alignment,
			url,
			blank,
			title,
			rel,
		} = props.attributes

		const classes = getClasses( props )

		return (
			<p className={ classnames( { [ `text-${ alignment }` ]: !! alignment } ) }>
				<RichText.Content
					tagName="a"
					className={ classes }
					href={ url }
					value={ text }
					target={ blank ? '_blank' : false }
					title={ title }
					rel={ rel }
				/>
			</p>
		)
	},
} )
