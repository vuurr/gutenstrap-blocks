// Global import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt, faTabletAlt, faLaptop, faDesktop } from '@fortawesome/free-solid-svg-icons'

const { __ } = wp.i18n
const { applyFilters } = wp.hooks
const { useMemo, Component } = wp.element
const { Path, SVG, Popover } = wp.components
const {
	Button,
	ButtonGroup,
	BaseControl,
} = wp.components

// Gutenstrap Icon
export const gutenstrapIcon = <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 365.5 365.5"><Path fill="#563D7C" d="m365.5 304.6c0 33.5-27.4 60.9-60.9 60.9h-243.7c-33.5 0-60.9-27.4-60.9-60.9v-243.7c0-33.5 27.4-60.9 60.9-60.9h243.7c33.5 0 60.9 27.4 60.9 60.9v243.7z"/><Path fill="#FFF" d="m166.7 80.5c-37.5 4.7-62.4 31.4-66.5 71.4-1.6 15.6-0.6 70.1 1.4 79.2 5 22.2 15.7 38.4 32.8 49.5 32.3 21.1 87.6 12.1 105.2-17.2 6.7-11.1 6.9-12.3 7.3-42.3l0.4-26.9 7-2.3c26.7-8.7 48.5-30.6 39.1-39.3-4.7-4.4-10.2-2.9-15.6 4.1-10.2 13.2-27.3 20.7-51.6 22.4-24.7 1.8-42.8 12.8-54.2 33.1-7.8 13.8 6.9 22.5 14.9 8.8 7.7-13.1 20.8-22.4 33.7-23.9l4.4-0.5v23.4c0 20.7-0.2 24-1.5 28.3-9 29-59.7 35.2-84.4 10.3-14.7-14.8-16.7-22.8-17.1-68.2-0.4-43.9 0.9-53.4 9.3-67.3 22.2-36.9 88.8-31.7 93.7 7.4 1.2 9.8 5.1 13.8 12.6 12.9 9.8-1.1 12-10.8 6.1-26.5-9.2-24.5-43.3-40.6-77-36.4"/></SVG>

// Set Gutesntrap icon for blocks category
wp.blocks.updateCategory( 'gutenstrap-blocks', { icon: gutenstrapIcon } )

// Bootstrap theme types
export const themeTypes = applyFilters( 'gutenstrap-blocks.theme.types', [
	{ value: 'primary', label: __( 'Primary', 'gutenstrap-blocks' ) },
	{ value: 'secondary', label: __( 'Secondary', 'gutenstrap-blocks' ) },
	{ value: 'success', label: __( 'Success', 'gutenstrap-blocks' ) },
	{ value: 'danger', label: __( 'Danger', 'gutenstrap-blocks' ) },
	{ value: 'warning', label: __( 'Warning', 'gutenstrap-blocks' ) },
	{ value: 'info', label: __( 'Info', 'gutenstrap-blocks' ) },
	{ value: 'light', label: __( 'Light', 'gutenstrap-blocks' ) },
	{ value: 'dark', label: __( 'Dark', 'gutenstrap-blocks' ) },
] )

// Bootstrap grid
export const gridOptions = {
	breakpoints: [
		{ value: 'xs', label: __( 'Extra small', 'gutenstrap-blocks' ), icon: <FontAwesomeIcon icon={ faMobileAlt } /> },
		...applyFilters( 'gutenstrap-blocks.grid.breakpoints', [
			{ value: 'sm', label: __( 'Small', 'gutenstrap-blocks' ), icon: <FontAwesomeIcon icon={ faMobileAlt } rotation={ 270 } /> },
			{ value: 'md', label: __( 'Medium', 'gutenstrap-blocks' ), icon: <FontAwesomeIcon icon={ faTabletAlt } /> },
			{ value: 'lg', label: __( 'Large', 'gutenstrap-blocks' ), icon: <FontAwesomeIcon icon={ faLaptop } /> },
			{ value: 'xl', label: __( 'Extra large', 'gutenstrap-blocks' ), icon: <FontAwesomeIcon icon={ faDesktop } /> },
		] ),
	],
	columnsNumber: applyFilters( 'gutenstrap-blocks.grid.columns', 12 ),
}

export const utils = {
	/**
	 * Rectangle position for popover
	 *
	 * @param  {String}  tag          Tag to look for in the editor
	 * @param  {Array}   dependencies Cache to check if rectangle have to be updated
	 * @return {DOMRect}
	 */
	inlineRect( tag, dependencies ) {
		return useMemo( () => {
			const selection = window.getSelection()
			const range = selection.rangeCount > 0 ? selection.getRangeAt( 0 ) : null
			if ( ! range ) {
				return
			}

			let element = range.startContainer

			// If the caret is right before the element, select the next element.
			element = element.nextElementSibling || element

			while ( element.nodeType !== window.Node.ELEMENT_NODE ) {
				element = element.parentNode
			}

			const closest = element.closest( tag )
			if ( closest ) {
				return closest.getBoundingClientRect()
			}
		}, dependencies )
	},

	/**
	 * Simple is object check
	 *
	 * @param  mixed     item
	 * @return {Boolean}
	 */
	isObj( item ) {
		return item && typeof item === 'object' && ! Array.isArray(item)
	},

	/**
	 * Merge two objects
	 *
	 * @param  {Object} target
	 * @param  {Object} source
	 * @return {Object}
	 */
	merge( target, source ) {
		if ( this.isObj( target ) && this.isObj( source ) ) {
			Object.keys( source ).forEach( ( key ) => {
				if ( this.isObj( source[ key ] ) ) {
					if ( ! target[ key ] || ! this.isObj( target[ key ] ) ) {
						target[ key ] = source[ key ]
					}

					this.merge( target[ key ], source[ key ] )
				}
				else {
					Object.assign( target, { [ key ]: source[ key ] } )
				}
			} )
		}

		if ( ! this.isObj( target ) ) {
			return source
		}

		return target
	},
}

/**
 * Component to show Popover at object
 */
export const PopoverAtObj = ( { tag, dependencies, ...props } ) => {
	return (
		<Popover
			position="bottom center"
			focusOnMount={ false }
			anchorRect={ utils.inlineRect( tag, dependencies ) }
			{ ...props }
		/>
	)
}

/**
 * Button toggle group selector component
 */
export class ButtonGroupSelect extends Component {
	constructor() {
		super( ...arguments )
	}

	render() {
		return (
			<BaseControl label={ this.props.label }>
				<ButtonGroup>
					{ this.props.options.map( ( item ) => (
						<Button
							isDefault={ this.props.value !== item.name }
							isPrimary={ this.props.value === item.name }
							isToggled={ this.props.value === item.name }
							onClick={ () => this.props.onChange && this.props.value !== item.name && this.props.onChange( item.name ) }
							isSmall
						>{ item.title }</Button>
					) ) }
				</ButtonGroup>
			</BaseControl>
		)
	}
}

/**
 * Support me on Patreon / Paypal component
 */
export class SupportMe extends Component {
	constructor() {
		super( ...arguments )
	}

	render() {
		return (
			<BaseControl className="bootstrap-styles">
				<div class="alert alert-primary">
					Like this plugin? Consider supporting it on <a href="https://www.patreon.com/eolant" target="_blank" rel="noopener noreferrer" class="alert-link">Patreon</a> or donate via <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=R7JUDUQ492BUU&source=url" target="_blank" rel="noopener noreferrer" class="alert-link">PayPal</a>.
				</div>
			</BaseControl>
		)
	}
}

