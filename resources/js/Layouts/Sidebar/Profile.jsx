import {Link} from "react-router-dom";
import React from "react";
import {GrSettingsOption} from "react-icons/gr";

const Profile = ({user, userType}) => {
    let userTypeName = '';
    switch (userType) {
        case 0:
            userTypeName = 'Admin';
            break;
        case 1:
            userTypeName = 'Cafe Owner';
            break;
        case 2:
            userTypeName = 'Waiter';
            break;
        case 3:
            userTypeName = 'Cook';
            break;
        case 4:
            userTypeName = 'Cashier';
            break;
        case 5:
            userTypeName = 'Customer';
            break;
        default:
            userTypeName = 'Unknown';
            break;
    }
    return (
        <div className="sidebar-user text-center">
            <Link className="setting-primary" to="/dashboard">
                <GrSettingsOption/>
            </Link>
            {user.avatar && <>
                <img className="img-90 rounded-circle" src={user.avatar} alt=""/>
                <div className="badge-bottom">
                    <span className="badge badge-primary">{user.gender}</span>
                </div>
            </>
            }

            <Link to="/dashboard/user/profile">
                <h6 className="mt-3 f-14 f-w-600">{user.name + " " + user.surname}</h6>
            </Link>
            <p className="mb-0 font-roboto">{userTypeName}</p>
        </div>
    )
}

export default Profile
