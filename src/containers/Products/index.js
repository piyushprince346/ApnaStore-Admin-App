import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProductById } from '../../actions';
import NewModal from '../../components/UI/NewModal';
import './style.css';
import { api } from '../../urlConfig';

function Products() {
    const [show, setShow] = useState(false);
    const [showProductDetail, setshowProductDetail] = useState(false);
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [quantity, setquantity] = useState('');
    const [description, setdescription] = useState('');
    const [productcategory, setproductcategory] = useState('');
    const [productPictures, setproductPictures] = useState([]);
    const [productDetails, setproductDetails] = useState({});

    const dispatch = useDispatch();
    const handleClose = () => {
        const form = new FormData();
        form.append('name', name);
        form.append('price', price);
        form.append('quantity', quantity);
        form.append('description', description);
        form.append('category', productcategory);
        productPictures.map(pic => form.append('productPicture', pic));
        dispatch(addProduct(form));
        setname('');
        setprice('');
        setquantity('');
        setdescription('');
        setproductcategory('');
        setproductDetails({});
        setproductPictures([]);
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const handleProductDetailShow = (prod) => {
        setproductDetails(prod);
        setshowProductDetail(true);
        console.log(prod);
    }

    const handleHide = () => {
        setname('');
        setprice('');
        setquantity('');
        setdescription('');
        setproductcategory('');
        setproductDetails({});
        setproductPictures([]);
        setShow(false);
    }
    const handleProductDetailHide = () => setshowProductDetail(false);

    // Initialdata for product and category
    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);

    const handleProductImages = (event) => {
        setproductPictures([
            ...productPictures,
            event.target.files[0]
        ])
    }
    const createCategoryList = (cats, options = []) => {
        for (let cat of cats) {
            options.push({
                value: cat._id,
                name: cat.name
            });
            if (cat.children.length > 0) {
                createCategoryList(cat.children, options);
            }
        }
        return options;
    }
    const renderProducts = () => {
        return (
            <Table responsive="sm" className='table_content'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (product.products.length) > 0 ? product.products.map((prod, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{prod.name}</td>
                                    <td>₹ {prod.price}</td>
                                    <td>{prod.quantity}</td>
                                    <td>{prod.category.name}</td>
                                    <td>
                                        <button onClick={() => handleProductDetailShow(prod)}>
                                            info
                                        </button>
                                        <button
                                            onClick={() => {
                                                const payload = {
                                                    productId: prod._id,
                                                };
                                                dispatch(deleteProductById(payload));
                                            }}
                                        >
                                            del
                                        </button>
                                    </td>
                                </tr>
                            )

                        }) : null
                    }
                </tbody>
            </Table>
        )
    };
    const renderAddProductModal = () => {
        return (
            <NewModal show={show} handleClose={handleClose} handleHide={handleHide} modalTitle='Add New Product'>
                <Input
                    label='Name'
                    value={name}
                    placeholder='Product name'
                    onChange={(e) => setname(e.target.value)}
                />
                <Input
                    label='Price'
                    value={price}
                    placeholder='Product price in ₹'
                    onChange={(e) => setprice(e.target.value)}
                />
                <Input
                    label='Description'
                    value={description}
                    placeholder='Product description'
                    onChange={(e) => setdescription(e.target.value)}
                />
                <Input
                    label='Quantity'
                    value={quantity}
                    placeholder='Product quantity in stock'
                    onChange={(e) => setquantity(e.target.value)}
                />
                <select value={productcategory} onChange={(e) => setproductcategory(e.target.value)} className='form-select'>
                    <option value={null}>Select Relevant Category</option>
                    {
                        createCategoryList(category.categories).map((cat) => {
                            return (
                                <option key={cat.value} value={cat.value}>{cat.name}</option>
                            )
                        })
                    }
                </select>
                {
                    productPictures.length > 0 ? productPictures.map((pic, index) => (<div key={index}>{pic.name}</div>)) : null
                }
                <div style={{ marginTop: '13px' }} className="mb-3">
                    <label htmlFor="formFile" className="form-label">Upload Product Images</label>
                    <input onChange={handleProductImages} name='productPicture' className="form-control" type="file" id="formFile" />
                </div>
            </NewModal>
        )
    };

    const handleProductDetailClose = () => {
        setshowProductDetail(false);
    }

    const renderProductDetailsModal = () => {
        return (
            <NewModal show={showProductDetail}
                handleClose={handleProductDetailClose}
                handleHide={handleProductDetailHide}
                modalTitle='Product Details'
                size="lg"
                buttonName='Close'
            >
                {
                    productDetails ? (
                        <div>
                            <Row>
                                <Col md={8}>
                                    <label className='key'>Name</label>
                                    <p className='value'>{productDetails.name}</p>
                                </Col>
                                <Col md={4}>
                                    <label className='key'>Price</label>
                                    <p className='value'>₹ {productDetails.price}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={8}>
                                    <label className='key'>Quantity</label>
                                    <p className='value'>{productDetails.quantity}</p>
                                </Col>
                                <Col md={4}>
                                    <label className='key'>Category</label>
                                    <p className='value'>{productDetails.category ? productDetails.category.name : '___'}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <label className='key'>Description</label>
                                    <p className='value'>{productDetails.description}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col >
                                    <label className='key'>Product Pictures</label>
                                    <div style={{ display: 'flex' }}>
                                        {
                                            productDetails.productPictures ?
                                                productDetails.productPictures.map(pic => {
                                                    return (
                                                        <div className='productImage'>
                                                            <img key={pic._id} src={api + '/public/' + pic.img} />
                                                        </div>
                                                    )
                                                })
                                                : null
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ) : null
                }

            </NewModal>
        )
    }
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Products</h3>
                            <Button variant='primary' onClick={handleShow}>Add New</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>
            {
                renderAddProductModal()
            }
            {
                renderProductDetailsModal()
            }
        </Layout>
    )
}

export default Products
