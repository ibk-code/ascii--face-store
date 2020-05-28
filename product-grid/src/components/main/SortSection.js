import React, {useContext} from 'react';
import {Form} from 'react-bootstrap';
import {ProductContext} from '../ProductContext'

const SortSection = props => {
    const {sort} = useContext(ProductContext)

    return(
        <React.Fragment>
            <div className="d-flex flex-wrap justify-content-between mt-5" data-aos="fade-up">
                <h2>Products</h2>
                <div>
                        <Form.Group controlId="sort-data" className="d-flex">
                            <Form.Label className="mr-3 mt-2" >Sort</Form.Label>
                            <Form.Control onChange={props.changeEvent} as="select" value={sort} >
                                <option value="size">size</option>
                                <option value="price">price</option>
                                <option value="id">id</option>
                            </Form.Control>
                        </Form.Group>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SortSection;