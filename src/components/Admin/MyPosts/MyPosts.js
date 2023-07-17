import styles from './MyPosts.module.css';

import * as adminService from '../../../services/adminService';

import { useAuthContext } from '../../../contexts/AuthContext';
import { useEffect } from 'react';

const MyPosts = () => {
    const { token, user } = useAuthContext();

    useEffect(() => {
        adminService.getMyPosts(token, user.userId)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.myItems);
                } else if (res.status === 409) {
                    console.log(res.errorMessage);
                }
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);

    return <div></div>
}

export default MyPosts;
