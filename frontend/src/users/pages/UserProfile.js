import React, { useEffect, useState, useContext } from "react";
import useHttpClient from "../../shared/hooks/http-hook";
import AuthContext  from "../../shared/context/auth-context";

import AccountSettings from '../components/AccountSettings';

export default function UserProfile() {
    return (
            <div className="user-account">
                <AccountSettings />
            </div>

    );
}


