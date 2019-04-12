/**
 * BLOCK: alert
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

// Global import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks'

// Import common
import { themeTypes } from '../common.js';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
    RichText,
    BlockControls,
    AlignmentToolbar,
    InspectorControls,
} = wp.editor;
const {
    PanelBody,
    SelectControl,
} = wp.components;

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'gutenstrap/alert', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Bootstrap Alert' ), // Block title.
	icon: <FontAwesomeIcon icon={ faBell } />,
	category: 'gutenstrap', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Gutenstrap' ),
		__( 'Bootstrap' ),
		__( 'Alert' ),
	],
	supports: {
		className: false,
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
		} = props;

		const {
			content,
			alignment,
			themeType = themeTypes[0].value,
		} = props.attributes

		const classes = classnames( [
			className,
			'alert',
			{ [ `alert-${ themeType }` ]: !!themeType },
		], applyFilters( 'gutenstrap.alert.classes', {
			'ugb-notification--dismissible': false,
		}, props ) )

		return (
			<div class="bootstrap-styles">
				<div className={ classes } role="alert">
					<InspectorControls>
						<PanelBody
							initialOpen={ true }
							title={ __( 'Settings' ) }
						>
							<SelectControl
								label={ __( 'Type' ) }
								value={ themeType }
								options={ themeTypes.map( ( { value, label } ) => ( {
									value: value,
									label: label,
								} ) ) }
								onChange={ value => {
									setAttributes( { themeType: value } )
								} }
							/>
						</PanelBody>
					</InspectorControls>
					<BlockControls>
	                    <AlignmentToolbar
	                        value={ alignment }
	                        onChange={ (alignment) => {
	                            setAttributes({ alignment })
	                        }}
	                    />
	                </BlockControls>
					<RichText
						tagName="div"
						value={ content }
						placeholder={ __('Enter message here...') }
						keepPlaceholderOnFocus={ true }
						onChange={ content => setAttributes( { content } ) }
					/>
				</div>
			</div>
		);
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
		} = props;

		const {
			content,
			alignment,
			themeType
		} = props.attributes;

		const classes = classnames( [
			className,
			'alert',
			{ [ `alert-${ themeType }` ]: !!themeType },
		], applyFilters( 'gutenstrap.alert.classes', {
			'ugb-notification--dismissible': dismissible,
		}, props ) )

		return (
			<div className={ classes } role="alert">
				{ props.attributes.content }
			</div>
		);
	},
} );
