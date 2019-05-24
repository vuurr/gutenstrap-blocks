/**
 * BLOCK: Bootstrap Row
 *
 */

//  Import CSS.
import './style.scss'
import './editor.scss'

// Global import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
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
    SelectControl,
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
		alignItems,
		justifyContent,
	} = props.attributes

	return classnames( [
		className,
		'row',
	], applyFilters( 'gutenstrap.row.classes', {
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
registerBlockType( 'gutenstrap/row', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'GS Row' ),
	description: __( 'Rows are wrappers for columns.' ),
	icon: <FontAwesomeIcon icon={ faMinus } />,
	category: 'gutenstrap', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Gutenstrap' ),
		__( 'Bootstrap' ),
		__( 'Row' ),
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
			<div class="gutenstrap-block-row" style={ { textAlign: alignment } }>
				<InspectorControls>
					<PanelBody
						initialOpen={ true }
						title={ __( 'Settings' ) }
					>
						<SelectControl
							label={ __( 'Vertical alignment' ) }
							value={ alignItems }
							options={ [
								{ value: null, label: __( 'None' ) },
								{ value: 'start', label: __( 'Start' ) },
								{ value: 'center', label: __( 'Center' ) },
								{ value: 'end', label: __( 'End' ) },
							] }
							onChange={ ( value ) => setAttributes( { alignItems: value } ) }
						/>

						<SelectControl
							label={ __( 'Horizontal alignment' ) }
							value={ justifyContent }
							options={ [
								{ value: null, label: __( 'None' ) },
								{ value: 'start', label: __( 'Start' ) },
								{ value: 'center', label: __( 'Center' ) },
								{ value: 'end', label: __( 'End' ) },
								{ value: 'around', label: __( 'Space around' ) },
								{ value: 'between', label: __( 'Space between' ) },
							] }
							onChange={ ( value ) => setAttributes( { justifyContent: value } ) }
						/>

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
		const classes = getClasses( props )

		return (
			<div className={ classes }>
				<InnerBlocks.Content />
			</div>
		)
	},
} )
