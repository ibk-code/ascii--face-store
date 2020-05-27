import React from 'react';
import {centsToDollars, formatDateRelative} from '../../helpers/helpers'

const ProductCard = React.forwardRef((props, ref) => {

    return(
        <React.Fragment>
            <div className="pg-card shadow" ref={ref}>
                <div className="ascii-face">
                    <p style={{fontSize: props.size+"px"}} className="text-center face font-weight-bold">{props.face}</p>
                </div>
                <div className="pg-card__desc">
                    <p><span>{props.size}px</span></p>
                    <p className="font-weight-bold"><span>{centsToDollars(props.price)}</span></p>
                    <p><span>{formatDateRelative(props.date)}</span></p>
                    <button className="btn cart-btn">
                        <i className="fas fa-cart-plus"></i> &nbsp; Add To Cart
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
})

export default ProductCard;