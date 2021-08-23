import React from 'react';
import Input from '../../../components/UI/Input';
import { Row, Col } from 'react-bootstrap';
import NewModal from '../../../components/UI/NewModal';

const AddCategoryModal = (props) => {
    const {
        show,
        handleClose,
        modalTitle,
        categoryname,
        setcategoryname,
        parentId,
        setparentId,
        categoryList,
        handleCategoryImage,
        handleHide
    } = props;
    return (
        <NewModal show={show} handleClose={handleClose} handleHide={handleHide} modalTitle={modalTitle}>
            <Row>
                <Col md={6}>
                    <Input
                        label=''
                        value={categoryname}
                        placeholder='Category name'
                        onChange={(e) => setcategoryname(e.target.value)}
                    />
                </Col>
                <Col>
                    <select value={parentId} onChange={(e) => setparentId(e.target.value)} className='form-select'>
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
            </Row>


            <Row>
                <Col md={8}>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Upload Category Image</label>
                        <input onChange={handleCategoryImage} name='categoryImage' className="form-control" type="file" id="formFile" />
                    </div>
                </Col>
            </Row>

        </NewModal>
    )
};

export default AddCategoryModal;