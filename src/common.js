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

export const themeTypes = applyFilters( 'gutenstrap.theme.types', [
	{ value: 'primary', label: __( 'Primary', 'gutenstrap' ) },
	{ value: 'secondary', label: __( 'Secondary', 'gutenstrap' ) },
	{ value: 'success', label: __( 'Success', 'gutenstrap' ) },
	{ value: 'danger', label: __( 'Danger', 'gutenstrap' ) },
	{ value: 'warning', label: __( 'Warning', 'gutenstrap' ) },
	{ value: 'info', label: __( 'Info', 'gutenstrap' ) },
	{ value: 'light', label: __( 'Light', 'gutenstrap' ) },
	{ value: 'dark', label: __( 'Dark', 'gutenstrap' ) },
] )

export const gridOptions = {
	breakpoints: [
		{ value: 'xs', label: __( 'Extra small', 'gutenstrap' ), icon: <FontAwesomeIcon icon={ faMobileAlt } /> },
		...applyFilters( 'gutenstrap.grid.breakpoints', [
			{ value: 'sm', label: __( 'Small', 'gutenstrap' ), icon: <FontAwesomeIcon icon={ faMobileAlt } rotation={ 270 } /> },
			{ value: 'md', label: __( 'Medium', 'gutenstrap' ), icon: <FontAwesomeIcon icon={ faTabletAlt } /> },
			{ value: 'lg', label: __( 'Large', 'gutenstrap' ), icon: <FontAwesomeIcon icon={ faLaptop } /> },
			{ value: 'xl', label: __( 'Extra large', 'gutenstrap' ), icon: <FontAwesomeIcon icon={ faDesktop } /> },
		] ),
	],
	columnsNumber: applyFilters( 'gutenstrap.grid.columns', 12 ),
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
					Like this plugin? Consider supporting me on <a href="https://www.patreon.com/eolant" target="_blank" rel="noopener noreferrer" class="alert-link">Patreon</a> or donate via <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=R7JUDUQ492BUU&source=url" target="_blank" rel="noopener noreferrer" class="alert-link">PayPal</a>.
				</div>
			</BaseControl>
		)
	}
}

