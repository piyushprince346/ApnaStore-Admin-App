import React from 'react';
import Input from '../../../components/UI/Input';
import { Row, Col } from 'react-bootstrap';
import NewModal from '../../../components/UI/NewModal';

const DeleteCategoryModal = (props) => {
    const {
        show,
        setshowDeleteModal,
        deleteCategoriesFinal,
        checkedArray
    } = props;
    return (
        <NewModal
            show={show}
            handleClose={() => setshowDeleteModal(false)}
            handleHide={() => setshowDeleteModal(false)}
            modalTitle='Confirm Deletion'
            buttons={
                [
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            setshowDeleteModal(false);
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: () => {
                            deleteCategoriesFinal();
                        }
                    }
                ]
            }
        >
            <h2 style={{ color: 'orange' }}>Are you sure to delete the below Categories...!</h2>

            <h5>Checked</h5>
            <ul>
                {
                    checkedArray.map((item, ind) => <li key={ind}>{item.name}</li>)
                }
            </ul>

        </NewModal>
    )
};

export default DeleteCategoryModal;