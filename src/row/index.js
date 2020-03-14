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
const { select } = wp.data;
const {
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	InnerBlocks,
	PanelColorSettings,
	getColorClassName,
	getColorObjectByColorValue,
} = wp.blockEditor
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
		color,
		colorClass,
	} = props.attributes

	return classnames( [
		className,
		'row',
	], applyFilters( 'gutenstrap-blocks.row.classes', {
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
registerBlockType( 'gutenstrap-blocks/row', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'GS Row', 'gutenstrap-blocks' ),
	description: __( 'Rows are wrappers for columns.', 'gutenstrap-blocks' ),
	icon: <FontAwesomeIcon icon={ faMinus } />,
	category: 'gutenstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Gutenstrap', 'gutenstrap-blocks' ),
		__( 'Gutenstrap Blocks', 'gutenstrap-blocks' ),
		__( 'Bootstrap', 'gutenstrap-blocks' ),
		__( 'Row', 'gutenstrap-blocks' ),
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
		color: {
			type: 'string'
		},
		colorClass: {
			type: 'string'
		}
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
			color,
			colorClass
		} = props.attributes

		const settings = select( 'core/editor' ).getEditorSettings();

		return (
			<div class="gutenstrap-blocks-block-row" style={ { textAlign: alignment } }>
				<InspectorControls>
					<PanelBody
						initialOpen={ true }
						title={ __( 'Settings', 'gutenstrap-blocks' ) }
					>
						<SelectControl
							label={ __( 'Vertical alignment', 'gutenstrap-blocks' ) }
							value={ alignItems }
							options={ [
								{ value: null, label: __( 'None', 'gutenstrap-blocks' ) },
								{ value: 'start', label: __( 'Start', 'gutenstrap-blocks' ) },
								{ value: 'center', label: __( 'Center', 'gutenstrap-blocks' ) },
								{ value: 'end', label: __( 'End', 'gutenstrap-blocks' ) },
							] }
							onChange={ ( value ) => setAttributes( { alignItems: value } ) }
						/>

						<SelectControl
							label={ __( 'Horizontal alignment', 'gutenstrap-blocks' ) }
							value={ justifyContent }
							options={ [
								{ value: null, label: __( 'None', 'gutenstrap-blocks' ) },
								{ value: 'start', label: __( 'Start', 'gutenstrap-blocks' ) },
								{ value: 'center', label: __( 'Center', 'gutenstrap-blocks' ) },
								{ value: 'end', label: __( 'End', 'gutenstrap-blocks' ) },
								{ value: 'around', label: __( 'Space around', 'gutenstrap-blocks' ) },
								{ value: 'between', label: __( 'Space between', 'gutenstrap-blocks' ) },
							] }
							onChange={ ( value ) => setAttributes( { justifyContent: value } ) }
						/>

						<ToggleControl
							label={ __( 'No gutters', 'gutenstrap-blocks' ) }
							checked={ nogutters }
							onChange={ () => setAttributes( { nogutters: ! nogutters } ) }
						/>

						<SupportMe />
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						colorSettings={ [
							{
								value: color,
								onChange: ( colorValue ) => setAttributes( {
									color: colorValue,
									colorClass: getColorObjectByColorValue( settings.colors, colorValue) ? getColorClassName( 'background-color', getColorObjectByColorValue( settings.colors, colorValue ).slug) : ''
								} ),
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

		let containerStyles = {
			backgroundColor: props.attributes.colorClass ? '' : props.attributes.color,
		};

		let finalClasses = classes + " " + props.attributes.colorClass;

		return (
			<div className={ finalClasses } style={containerStyles}>
				<InnerBlocks.Content />
			</div>
		)
	},
} )
