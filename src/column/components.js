// Global import
import classnames from 'classnames'

// Import common
import { gridOptions, utils } from '../common.js'

const { __ } = wp.i18n
const { Component } = wp.element
const {
	Button,
	ButtonGroup,
	Dropdown,
	RangeControl,
	BaseControl,
} = wp.components

const columnStaticSizes = [
	{ value: 'equal', label: __( 'Equal', 'gutenstrap-blocks' ) },
	{ value: 'auto', label: __( 'Auto', 'gutenstrap-blocks' ) },
]

/**
 * Column size selector component
 */
export class ColumnSizeSelect extends Component {
	constructor() {
		super( ...arguments )
	}

	render() {
		return (
			<BaseControl>
				{ gridOptions.breakpoints.map( ( item ) => (
					<BreakpointColumnSizeSelect
						label={ item.label }
						icon={ item.icon }
						value={ this.props.value[ item.value ] }
						onChange={ ( value ) => this.props.onChange && this.props.onChange( { [ item.value ]: utils.merge( this.props.value[ item.value ], value ) } ) }
					/>
				) ) }
			</BaseControl>
		)
	}
}

/**
 * Toggle button
 */
class BreakpointColumnSizeButton extends Component {
	constructor() {
		super( ...arguments )
	}

	render() {
		return (
			<Button
				isDefault={ ! this.props.isChecked }
				isPrimary={ this.props.isChecked }
				isToggled={ this.props.isChecked }
				onClick={ () => this.props.onChange && this.props.onChange( this.props.isChecked ? undefined : this.props.value ) }
				isSmall
			>{ this.props.label }</Button>
		)
	}
}

/**
 * Dropdown button
 */
class BreakpointColumnSizeDropdown extends Component {
	constructor() {
		super( ...arguments )
	}

	render() {
		return (
			<Dropdown
				renderToggle={ ( { isOpen, onToggle } ) => (
					<Button
						isDefault={ ! this.props.value || isNaN( this.props.value[ this.props.param ] ) }
						isPrimary={ this.props.value && ! isNaN( this.props.value[ this.props.param ] ) }
						isSmall
						onClick={ onToggle }
						aria-expanded={ isOpen }
					>
						{ this.props.label + ( this.props.value && ! isNaN( this.props.value[ this.props.param ] ) ? ': ' + this.props.value[ this.props.param ] : '' ) }
					</Button>
				) }
				renderContent={ () => (
					<div class="gutenstrap-blocks-block-column__popover">
						<div
							className={ classnames( 'gutenstrap-blocks-block-column__popover__value', {
								'active': this.props.value && ! isNaN( this.props.value[ this.props.param ] )
							} ) }
						>
							{ this.props.value && ! isNaN( this.props.value[ this.props.param ] ) && this.props.value[ this.props.param ] }
						</div>
						<RangeControl
							value={ this.props.value && this.props.value[ this.props.param ] }
							onChange={ ( value ) => this.props.onChange && this.props.onChange( { [ this.props.param ]: value } ) }
							min={ this.props.min }
							max={ this.props.max }
							allowReset={ true }
						/>
					</div>
				) }
			/>
		)
	}
}

/**
 * Column size select for specific breakpoint
 */
class BreakpointColumnSizeSelect extends Component {
	constructor() {
		super( ...arguments )
	}

	render() {
		return (
			<div class="components-base-control__field">
				<label class="components-base-control__label">{ this.props.icon } { this.props.label }</label>
				<ButtonGroup>
					{ columnStaticSizes.map( ( item ) => (
						<BreakpointColumnSizeButton
							value={ item.value }
							isChecked={ this.props.value && this.props.value.size === item.value }
							label={ item.label }
							onChange={ ( value ) => this.props.onChange && this.props.onChange( { size: value } ) }
						/>
					) ) }
					<BreakpointColumnSizeDropdown
						param="size"
						value={ this.props.value }
						label={ __( 'Size', 'gutenstrap-blocks' ) }
						min={ 1 }
						max={ gridOptions.columnsNumber }
						onChange={ ( value ) => this.props.onChange && this.props.onChange( value ) }
					/>
					<BreakpointColumnSizeDropdown
						param="offset"
						value={ this.props.value }
						label={ __( 'Offset', 'gutenstrap-blocks' ) }
						min={ 0 }
						max={ gridOptions.columnsNumber - 1 }
						onChange={ ( value ) => this.props.onChange && this.props.onChange( value ) }
					/>
				</ButtonGroup>
			</div>
		)
	}
}
