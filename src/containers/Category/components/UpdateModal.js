import React from 'react';
import Input from '../../../components/UI/Input';
import { Row, Col } from 'react-bootstrap';
import NewModal from '../../../components/UI/NewModal';
const UpdateCategoriesModal = (props) => {
    const {
        show,
        handleClose,
        modalTitle,
        size,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList,
        onSubmit,
        setshowUpdateModal
    } = props;
    return (
        <NewModal buttonName='Update' size={size} show={show} handleClose={handleClose} handleHide={() => setshowUpdateModal(false)} modalTitle={modalTitle}>
            <Row>
                <Col>
                    <h6>Expanded</h6>
                </Col>
            </Row>
            {
                expandedArray.length > 0 &&
                expandedArray.map((item, index) =>
                    <>
                        <Row key={index}>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder='Category name'
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                />
                            </Col>
                            <Col>
                                <select value={item.parentId} onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')} className='form-select'>
                                    <option value={null}>Select Parent Category</option>
                                    {
                                        categoryList.map((cat) => {
                                            return (
                                                <option key={cat.value} value={cat.value}>{cat.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select value={item.type} onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')} className='form-select'>
                                    <option value={null}>Select Type</option>
                                    <option value='store' >Store</option>
                                    <option value='product'>Product</option>
                                    <option value='page'>Page</option>
                                </select>
                            </Col>
                        </Row>
                    </>
                )
            }
            <Row>
                <Col>
                    <h6>Checked</h6>
                </Col>
            </Row>
            {
                checkedArray.length > 0 &&
                checkedArray.map((item, index) =>
                    <>
                        <Row key={index}>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder='Category name'
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                />
                            </Col>
                            <Col>
                                <select value={item.parentId} onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')} className='form-select'>
                                    <option value={null}>Select Parent Category</option>
                                    {
                                        categoryList.map((cat) => {
                                            return (
                                                <option key={cat.value} value={cat.value}>{cat.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select value={item.type} onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')} className='form-select'>
                                    <option value={null}>Select Type</option>
                                    <option value='store' >Store</option>
                                    <option value='product'>Product</option>
                                    <option value='page'>Page</option>
                                </select>
                            </Col>
                        </Row>

                    </>
                )
            }
        </NewModal>
    )
};

export default UpdateCategoriesModal;