/**
 * FORMAT: Bootstrap Badge
 *
 */

//  Import CSS
import './editor.scss'

// Global import
import classnames from 'classnames'

// Import common
import { bootstrapIcon, themeTypes, PopoverAtObj } from '../common.js'

const { __ } = wp.i18n
const { applyFilters } = wp.hooks
const { LEFT, RIGHT, UP, DOWN, BACKSPACE, ENTER } = wp.keycodes
const { Component, Fragment } = wp.element
const { registerFormatType, toggleFormat, applyFormat } = wp.richText
const {
	RichTextToolbarButton,
} = wp.blockEditor
const {
	SelectControl,
	ToggleControl,
	IconButton,
	SVG,
	Path,
} = wp.components

/**
 * Register: Bootstrap Badge.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}    name     Format name.
 * @param  {Object}    settings Format settings.
 * @return {?WPFormat}          The format, if it has been successfully
 *                              registered otherwise `undefined`.
 */
const name = 'gutenstrap/badge'
const title = __( 'GS Badge', 'gutenstrap' )
const tag = 'span'

registerFormatType( name, {
	// Format name. Format names must be string that contains a namespace prefix. Example: my-plugin/my-custom-format.
	title: title,
	keywords: [
		__( 'Gutenstrap', 'gutenstrap' ),
		__( 'Bootstrap', 'gutenstrap' ),
		__( 'Badge', 'gutenstrap' ),
	],
	object: false,
	tagName: tag,
	className: 'badge',
	attributes: {
		className: 'class',
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: class BadgeEdit extends Component {
		constructor() {
			super( ...arguments )
			this.onKeyDown = this.onKeyDown.bind( this )
			this.state = {
				pill: false,
			}
		}

		static getDerivedStateFromProps( props, state ) {
			const { activeAttributes: { className } } = props

			if ( className === state.previousClass ) {
				return null
			}

			if ( ! className ) {
				return {
					pill: undefined,
					themeType: undefined,
					previousClass: className,
				}
			}

			let type = undefined
			themeTypes.forEach( ( { value, label } ) => {
				if ( className.includes( 'badge-' + value ) ) {
					type = value
					return false
				}
			} )

			return {
				pill: !!className.includes( 'badge-pill' ),
				themeType: type,
				previousClass: className,
			}
		}

		onKeyDown( event ) {
			if ( [ LEFT, DOWN, RIGHT, UP, BACKSPACE, ENTER ].indexOf( event.keyCode ) > -1 ) {
				// Stop the key event from propagating up to ObserveTyping.startTypingInTextField.
				event.stopPropagation()
			}
		}

		/**
		 * Create list of classes for class property
		 *
		 * @param  Obj     props Block properties
		 * @return string
		 */
		getClasses() {
			const {
				themeType = themeTypes[0].value,
				pill
			} = this.state

			return classnames( [
				{ [ `badge-${ themeType }` ]: !! themeType },
			], applyFilters( 'gutenstrap.badge.classes', {
				'badge-pill': pill,
			}, this.state ) )
		}

		render() {
			const { value, onChange, isActive } = this.props

			return (
				<Fragment>
					<RichTextToolbarButton
						icon={ <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71 78"><Path d="M33 40.8 39.8 40.8 36.4 30.6 z"/><Path d="M54 7.8H17c-5.2 0-9.5 4.3-9.5 9.6v43.1c0 5.3 4.3 9.6 9.5 9.6H54c5.2 0 9.5-4.3 9.5-9.6V17.4C63.5 12.2 59.2 7.8 54 7.8zM43.1 51l-1.9-5.6h-9.7L29.7 51h-5.9l10-27.3H39L49 51H43.1z"/></SVG> }
						title={ title }
						isActive={ isActive }
						onClick={ () => {
							onChange( toggleFormat( value, {
								type: name,
								attributes: {
									className: this.getClasses(),
								},
							} ) )
						} }
					/>
					{ isActive &&
						<PopoverAtObj
							// Reposition Popover when the selection changes or
							// when the width changes.
							tag={ tag }
							dependencies={ [ value.start, value.end ] }
						>
							{ // Disable reason: KeyPress must be suppressed so the block doesn't hide the toolbar
							/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */ }
							<form
								className="editor-format-toolbar__inline-container-content block-editor-format-toolbar__inline-container-content"
								onKeyPress={ ( event ) => event.stopPropagation() }
								onKeyDown={ this.onKeyDown }
								onSubmit={ ( event ) => {
									onChange( applyFormat( value, {
										type: name,
										attributes: {
											className: this.getClasses(),
										},
									} ) )

									event.preventDefault()
								} }
							>
								<div class="editor-format-toolbar__inline-container-content__inner">
									<SelectControl
										value={ this.state.themeType }
										options={ themeTypes.map( ( { value, label } ) => ( {
											value,
											label,
										} ) ) }
										onChange={ ( themeType ) => this.setState( { themeType } ) }
									/>

									<ToggleControl
										label={ __( 'Pill badge', 'gutenstrap' ) }
										checked={ this.state.pill }
										onChange={ () => this.setState( { pill: ! this.state.pill } ) }
									/>
								</div>

								<IconButton icon="editor-break" label={ __( 'Apply', 'gutenstrap' ) } type="submit" />
							</form>
							{ /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */ }
						</PopoverAtObj>
					}
				</Fragment>
			)
		}
	},
} )
