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
const { select } = wp.data;
const {
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	InnerBlocks,
	PanelColorSettings,
	getColorClassName,
	getColorObjectByColorValue,
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
	], applyFilters( 'gutenstrap-blocks.container.classes', {
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
registerBlockType( 'gutenstrap-blocks/container', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'GS Container', 'gutenstrap-blocks' ),
	description: __( 'Provide a means to center and horizontally pad your site’s contents.', 'gutenstrap-blocks' ),
	icon: <FontAwesomeIcon icon={ faSquare } />,
	category: 'gutenstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Gutenstrap', 'gutenstrap-blocks' ),
		__( 'Gutenstrap Blocks', 'gutenstrap-blocks' ),
		__( 'Bootstrap', 'gutenstrap-blocks' ),
		__( 'Container', 'gutenstrap-blocks' ),
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
			color,
		} = props.attributes

		return (
			<div class="gutenstrap-blocks-block-container" style={ { textAlign: alignment } }>
				<InspectorControls>
					<PanelBody
						initialOpen={ true }
						title={ __( 'Settings', 'gutenstrap-blocks' ) }
					>
						<ToggleControl
							label={ __( 'Fluid', 'gutenstrap-blocks' ) }
							checked={ isFluid }
							onChange={ () => setAttributes( { isFluid: ! isFluid } ) }
						/>

						<SupportMe />
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						colorSettings={ [
							{
								value: color,
								onChange: ( colorValue ) => setAttributes( { color: colorValue } ),
								label: __( 'Background Color' ),
							}
						] }
					>
					</PanelColorSettings>
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

		const settings = select( 'core/editor' ).getEditorSettings();
		const colorObject = getColorObjectByColorValue( settings.colors, props.attributes.color );
		let containerClass = undefined;
		if(colorObject && colorObject.name) {
			containerClass = getColorClassName( 'background-color', colorObject.name )
		}

		let containerClasses = containerClass || '';

		let containerStyles = {
			backgroundColor: containerClass ? undefined : props.attributes.color,
		};

		let finalClasses = classes + " " + containerClasses;

		return (
			<div className={ finalClasses } style={containerStyles}>
				<InnerBlocks.Content />
			</div>
		)
	},
} )
