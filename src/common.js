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

export const bootstrapIcon = <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><Path d="M292.3 311.93c0 42.41-39.72 41.43-43.92 41.43h-80.89v-81.69h80.89c42.56 0 43.92 31.9 43.92 40.26zm-50.15-73.13c.67 0 38.44 1 38.44-36.31 0-15.52-3.51-35.87-38.44-35.87h-74.66v72.18h74.66zM448 106.67v298.66A74.89 74.89 0 0 1 373.33 480H74.67A74.89 74.89 0 0 1 0 405.33V106.67A74.89 74.89 0 0 1 74.67 32h298.66A74.89 74.89 0 0 1 448 106.67zM338.05 317.86c0-21.57-6.65-58.29-49.05-67.35v-.73c22.91-9.78 37.34-28.25 37.34-55.64 0-7 2-64.78-77.6-64.78h-127v261.33c128.23 0 139.87 1.68 163.6-5.71 14.21-4.42 52.71-17.98 52.71-67.12z" /></SVG>

export const themeTypes = applyFilters( 'gutenstrap.theme.types', [
	{ value: 'primary', label: __('Primary') },
	{ value: 'secondary', label: __('Secondary') },
	{ value: 'success', label: __('Success') },
	{ value: 'danger', label: __('Danger') },
	{ value: 'warning', label: __('Warning') },
	{ value: 'info', label: __('Info') },
	{ value: 'light', label: __('Light') },
	{ value: 'dark', label: __('Dark') },
] )

export const gridOptions = {
	breakpoints: [
		{ value: 'xs', label: __('Extra small'), icon: <FontAwesomeIcon icon={ faMobileAlt } /> },
		...applyFilters( 'gutenstrap.grid.breakpoints', [
			{ value: 'sm', label: __('Small'), icon: <FontAwesomeIcon icon={ faMobileAlt } rotation={ 270 } /> },
			{ value: 'md', label: __('Medium'), icon: <FontAwesomeIcon icon={ faTabletAlt } /> },
			{ value: 'lg', label: __('Large'), icon: <FontAwesomeIcon icon={ faLaptop } /> },
			{ value: 'xl', label: __('Extra large'), icon: <FontAwesomeIcon icon={ faDesktop } /> },
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
