import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './OrderInfo.styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { AddedItem } from '../../../tabs/useTabHook';

type Props = {
	value: AddedItem[];
	activeItem: AddedItem | null;
	onClick: () => void;
} & WithStyles;

const getTotal = ( items: AddedItem[], attr: keyof AddedItem ) =>
	items ? items.reduce( ( sum, item ) => sum += +item[attr], 0 ).toFixed( 2 ) : null;

function OrderInfo( {
	                    classes,
	                    value: orderItems,
	                    activeItem: isSelected,
	                    onClick
                    }: Props
) {

	const total = getTotal( orderItems, 'cost' );

	return (
		<div className={ classes.wrapper }>
			{ isSelected ?
				<div className='delete' onClick={ onClick }>
					<DeleteForeverIcon/>
				</div> :
				<div className='total'>
					{ total }
				</div>
			}
		</div>
	);
}

export default withStyles( styles )( OrderInfo );
