import styles from './DeleteDialog.module.css';

const DeleteDialog = ({ hideDialog, handleDelete, itemName }) => {
    return (
        <div onClick={hideDialog} className={styles['overlay']}>
            <div id={styles['delete-confirmation-dialog']}>
                <h3 className={styles['dialog--title']}>Confirm Deletion</h3>
                <p className={styles['dialog--message']}>Are you sure you want to delete {itemName}?</p>
                <div className={styles['delete-confirmation-buttons']}>
                    <button onClick={handleDelete} className={styles['confirm--btn']}>Yes, delete</button>
                    <button onClick={hideDialog} className={styles['cancel--btn']}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteDialog;