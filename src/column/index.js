/**
 * BLOCK: Bootstrap Column
 *
 */

//  Import CSS
import './editor.scss'

// Global import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faColumns } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'

// Import common
import { utils, SupportMe } from '../common.js'

// Local imoprt
import { ColumnSizeSelect } from './components.js'

const { __ } = wp.i18n
const { applyFilters } = wp.hooks
const { registerBlockType } = wp.blocks
const {
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	InnerBlocks,
} = wp.blockEditor
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
		col,
	} = props.attributes

	let colClasses = []
	if ( utils.isObj( col ) ) {
		Object.keys( col ).forEach( ( breakpoint ) => {
			if ( utils.isObj( col[ breakpoint ] ) ) {
				let infix = breakpoint !== 'xs' ? '-' + breakpoint : ''

				if ( col[ breakpoint ].size !== undefined ) {
					colClasses.push( 'col' + infix + ( col[ breakpoint ].size !== 'equal' ? '-' + col[ breakpoint ].size : '' ) )
				}

				if ( col[ breakpoint ].offset !== undefined && ( infix || col[ breakpoint ].offset !== 0 ) ) {
					colClasses.push( 'offset' + infix + '-' + col[ breakpoint ].offset )
				}
			}
		} )
	}

	return classnames( [
		className,
		...colClasses,
	], applyFilters( 'gutenstrap-blocks.column.classes', {
		[ `text-${ alignment }` ]: !! alignment
	}, props ) )
}

/**
 * Register: Bootstrap Column.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered otherwise `undefined`.
 */
registerBlockType( 'gutenstrap-blocks/column', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'GS Column', 'gutenstrap-blocks' ),
	description: __( 'In a grid layout, content must be placed within columns and only columns may be immediate children of rows.', 'gutenstrap-blocks' ),
	icon: <FontAwesomeIcon icon={ faColumns } />,
	category: 'gutenstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Gutenstrap', 'gutenstrap-blocks' ),
		__( 'Gutenstrap Blocks', 'gutenstrap-blocks' ),
		__( 'Bootstrap', 'gutenstrap-blocks' ),
		__( 'Column', 'gutenstrap-blocks' ),
	],
	supports: {
		className: false,
	},

	attributes: {
		alignment: {
			type: 'string',
		},
		col: {
			type: 'object',
			default: {},
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
			col,
		} = props.attributes

		return (
			<div class="gutenstrap-blocks-block-column" style={ { textAlign: alignment } }>
				<InspectorControls>
					<PanelBody
						initialOpen={ true }
						title={ __( 'Settings', 'gutenstrap-blocks' ) }
					>
						<ColumnSizeSelect
							value={ col }
							onChange={ ( value ) => setAttributes( { col: { ...col, ...value } } ) }
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
