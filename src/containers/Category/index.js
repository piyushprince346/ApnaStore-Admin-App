import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategoriesAction, getAllCategory, updateCategories } from '../../actions';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import NewModal from '../../components/UI/NewModal';
import './style.css'
// checkBoxTree imports
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoriesModal from './components/UpdateModal';
import AddCategoryModal from './components/AddNewModal';
import DeleteCategoryModal from './components/DeleteModal';


function Category() {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [categoryname, setcategoryname] = useState('');
    const [parentId, setparentId] = useState('');
    const [categoryImage, setcategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setcheckedArray] = useState([]);
    const [expandedArray, setexpandedArray] = useState([]);
    const [showUpdateModal, setshowUpdateModal] = useState(false);
    const [showDeleteModal, setshowDeleteModal] = useState(false);
    const category = useSelector(state => state.category);

    useEffect(() => {
        console.log(category);
    }, [category])

    const handleClose = () => {
        const form = new FormData();
        if (categoryname === '') {
            alert('Name is required');
            return;
        }

        form.append('name', categoryname);
        form.append('parentId', parentId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        setcategoryname('');
        setparentId('');
        // console.log(form);
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);
    const handleCategoryImage = (event) => {
        setcategoryImage(event.target.files[0]);
    };


    const renderCategories = (categories) => {
        let cats = [];
        for (let cat of categories) {
            cats.push(
                {
                    label: cat.name,
                    value: cat._id,
                    children: cat.children.length > 0 && renderCategories(cat.children)
                }
            )
        }
        return cats;
    };

    const createCategoryList = (cats, options = []) => {
        for (let cat of cats) {
            options.push({
                value: cat._id,
                name: cat.name,
                parentId: cat.parentId,
                type: cat.type
            });
            if (cat.children.length > 0) {
                createCategoryList(cat.children, options);
            }
        }
        return options;
    };

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setshowUpdateModal(!showUpdateModal);
    };

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArr = [];
        const expandedArr = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && checkedArr.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && expandedArr.push(category);
        })
        setcheckedArray(checkedArr);
        setexpandedArray(expandedArr);
    };

    const handleCategoryInput = (key, value, index, type) => {
        console.log(value);
        if (type === "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index === _index ? { ...item, [key]: value } : item);
            setcheckedArray(updatedCheckedArray);
        } else if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index === _index ? { ...item, [key]: value } : item);
            setexpandedArray(updatedExpandedArray);
        }
    };

    const updateCategoriesForm = () => {
        const form = new FormData();
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            if (item.parentId) {
                form.append('parentId', item.parentId);
            }
            else {
                form.append('parentId', '');
            }
            form.append('type', item.type);
        })
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            if (item.parentId) {
                form.append('parentId', item.parentId);
            }
            else {
                form.append('parentId', '');
            }
            form.append('type', item.type);
        })
        dispatch(updateCategories(form));
        setshowUpdateModal(false);
    };

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setshowDeleteModal(true);
        console.log(checkedArray, expandedArray);
    }

    const deleteCategoriesFinal = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        // const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        // const idsArray = expandedIdsArray.concat(checkedIdsArray);

        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray));
        }
        setshowDeleteModal(false);
    };

    return (
        <Layout sidebar>
            <Container>
                <div style={{ color: 'green' }}>
                    {category.message ? category.message : null}
                </div>

                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className='categories-head'>Categories</span>
                            <div>
                                <Button style={{ marginRight: '10px' }} variant='danger' onClick={() => deleteCategory()}><IoIosTrash />Delete</Button>
                                <Button style={{ marginRight: '10px' }} variant='success' onClick={() => updateCategory()}><IoIosCloudUpload /> Edit</Button>
                                <Button variant='primary' onClick={handleShow}><IoIosAdd /> Add New</Button>
                            </div>
                        </div>
                        <hr className='hrclass'></hr>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                        {/* <ul>
                            {renderCategories(category.categories)}
                        </ul> */}
                    </Col>
                </Row>
                <br></br>

            </Container>
            <AddCategoryModal
                show={show}
                handleClose={handleClose}
                handleHide={handleHide}
                modalTitle='Add New Category'
                categoryname={categoryname}
                setcategoryname={setcategoryname}
                parentId={parentId}
                setparentId={setparentId}
                categoryList={createCategoryList(category.categories)}
                handleCategoryImage={handleCategoryImage}
            />

            {/* Edit Categories */}
            <UpdateCategoriesModal
                show={showUpdateModal}
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                size='lg'
                modalTitle='Update Category'
                handleClose={updateCategoriesForm}
                setshowUpdateModal={setshowUpdateModal}
                categoryList={createCategoryList(category.categories)}
            />

            {/* Delete Categories Modal */}
            <DeleteCategoryModal
                show={showDeleteModal}
                deleteCategoriesFinal={deleteCategoriesFinal}
                setshowDeleteModal={setshowDeleteModal}
                checkedArray={checkedArray}
            />
        </Layout>
    )
}

export default Category
