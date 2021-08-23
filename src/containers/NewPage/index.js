import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../actions';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import NewModal from '../../components/UI/NewModal'
import linearCategories from '../../helpers/linearCategories';

function NewPage() {
    const [showCreateModal, setshowCreateModal] = useState(false);
    const [title, settitle] = useState('');
    const category = useSelector(state => state.category);
    const [categories, setcategories] = useState([]);
    const [categoryId, setcategoryId] = useState('');
    const [desc, setdesc] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [type, settype] = useState('');
    const page = useSelector(state => state.page);

    const dispatch = useDispatch();

    useEffect(() => {
        setcategories(linearCategories(category.categories));
    }, [category])

    useEffect(() => {
        console.log(page);
    }, [page])

    const handleProductImages = (e) => {
        console.log(e);
        setProducts([...products, e.target.files[0]]);
    }

    const handleBannerImages = (e) => {
        console.log(e);
        setBanners([...banners, e.target.files[0]]);
    }

    const handleCategoryChange = (e) => {
        const cat = categories.find(category => category.value === e.target.value);
        setcategoryId(e.target.value);
        settype(cat.type);
    }

    const refreshPageForm = () => {
        settitle('');
        setcategoryId('');
        settype('');
        setdesc('');
        setBanners([]);
        setProducts([]);
        setshowCreateModal(false);
    }

    const submitPageForm = (e) => {
        //e.target.preventDefault();

        if (title === "") {
            alert('Title is required');
            setshowCreateModal(false);
            return;
        }

        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });
        console.log({ title, desc, categoryId, type, banners, products });
        dispatch(createPage(form));
        // unfill the form
        refreshPageForm();
    }

    const renderCreatePageModal = () => {
        return (
            <NewModal
                show={showCreateModal}
                modalTitle='Create New Page'
                handleClose={submitPageForm}
                handleHide={() => refreshPageForm()}
            >
                <Container>
                    <Row>
                        <Col>
                            <select
                                className='form-select form-control'
                                value={categoryId}
                                onChange={handleCategoryChange}
                            >
                                <option value="">Select Category</option>
                                {
                                    categories.map((item, index) =>
                                        <option value={item.value} key={index}>{item.name}</option>
                                    )
                                }

                            </select>
                        </Col>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => {
                                    settitle(e.target.value);
                                    // console.log(title);
                                }}
                                placeholder='Page title'
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                label='Description'
                                value={desc}
                                onChange={(e) => setdesc(e.target.value)}
                                placeholder={'Page Description'}
                                className=""
                            />
                        </Col>
                    </Row>


                    <Row>
                        <Col md={7}>

                            <Input
                                label='Banner Images'
                                className="form-control"
                                type="file"
                                name="banners"
                                onChange={handleBannerImages}
                            />
                        </Col>
                        <Col>
                            {
                                banners.length > 0 ?
                                    banners.map((banner, index) =>
                                        <Row key={index}>
                                            <Col style={{ fontSize: '12px', color: 'red' }}>{banner.name}</Col>
                                        </Row>

                                    ) : null
                            }
                        </Col>
                        <hr style={{ marginTop: '3px', marginBottom: '3px', color: 'gray' }}></hr>
                    </Row>

                    <Row>
                        <Col md={7}>
                            <Input
                                label='Product Images'
                                className="form-control"
                                type="file"
                                name="products"
                                onChange={handleProductImages}
                            />
                        </Col>
                        <Col>
                            {
                                products.length > 0 ?
                                    products.map((product, index) =>
                                        <Row key={index}>
                                            <Col style={{ fontSize: '12px', color: 'red' }}>{product.name}</Col>
                                        </Row>
                                    ) : null
                            }
                        </Col>
                    </Row>
                </Container>

            </NewModal>
        )
    }
    return (
        <Layout sidebar>
            {
                page.loading ?
                    <p>Loading, Please wait...!</p>
                    :
                    <>
                        {
                            page.message ? <h3 style={{ color: 'orangered' }}>{page.message}....!</h3> : null
                        }
                        {renderCreatePageModal()}
                        <button onClick={() => setshowCreateModal(true)}>Create Page</button>
                    </>
            }

        </Layout>
    )
}

export default NewPage
