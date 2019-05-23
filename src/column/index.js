/**
 * BLOCK: Bootstrap Column
 *
 */

//  Import CSS.
import './style.scss'
import './editor.scss'

// Global import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faColumns } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'

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
 * @param  Obj     props Block properties
 * @return string
 */
function getClasses( props ) {
	const {
		className,
	} = props

	const {
		alignment,
		nogutters,
	} = props.attributes

	return classnames( [
		className,
		'col',
		{ [ `text-${ alignment }` ]: !!alignment }
	], applyFilters( 'gutenstrap.column.classes', {
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
registerBlockType( 'gutenstrap/column', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'GS Column' ),
	description: __( 'In a grid layout, content must be placed within columns and only columns may be immediate children of rows.' ),
	icon: <FontAwesomeIcon icon={ faColumns } />,
	category: 'gutenstrap', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Gutenstrap' ),
		__( 'Bootstrap' ),
		__( 'Column' ),
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
		} = props.attributes

		return (
			<div class="gutenstrap-block-column" style={ { textAlign: alignment } }>
				<InspectorControls>
					<PanelBody
						initialOpen={ true }
						title={ __( 'Settings' ) }
					>
						<ToggleControl
							label={ __( 'No gutters' ) }
							checked={ nogutters }
							onChange={ () => setAttributes( { nogutters: ! nogutters } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<BlockControls>
                    <AlignmentToolbar
                        value={ alignment }
                        onChange={ newAlignment => setAttributes( { alignment: newAlignment } ) }
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
		const {
			className,
		} = props

		const {
			content,
		} = props.attributes

		const classes = getClasses( props )

		return (
			<div className={ classes }>
				<InnerBlocks.Content />
			</div>
		)
	},
} )
