import React, { useContext } from 'react'
import styles from './SideBar.module.css'
import ArticleIcon from '@mui/icons-material/Article'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../utils/AuthContext'

const SideBar = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { isLogin, setLogin, userInfo, setUserInfo } = useContext(AuthContext)

    const handleLogout = () => {
        setLogin(false)
        setUserInfo(null)
        navigate('/')
    }

    return (
        <div className={styles.sideBar}>

            <div className={styles.sideBarIcon}>
                <ArticleIcon sx={{ fontSize: 54, marginBottom: 2 }} />
                <div className={styles.sideBarTopContent}>
                    Resume Screening
                </div>
            </div>

            <div className={styles.sideBarOptionsBlock}>

                <Link
                    to="/dashboard"
                    className={[
                        styles.sideBarOption,
                        location.pathname === '/dashboard'
                            ? styles.selectedOption
                            : ''
                    ].join(' ')}
                >
                    <DashboardIcon sx={{ fontSize: 22 }} />
                    <div>Dashboard</div>
                </Link>

                <Link
                    to="/history"
                    className={[
                        styles.sideBarOption,
                        location.pathname === '/history'
                            ? styles.selectedOption
                            : ''
                    ].join(' ')}
                >
                    <ManageSearchIcon sx={{ fontSize: 22 }} />
                    <div>History</div>
                </Link>

                <Link
                    to="/admin"
                    className={[
                        styles.sideBarOption,
                        location.pathname === '/admin'
                            ? styles.selectedOption
                            : ''
                    ].join(' ')}
                >
                    <AdminPanelSettingsIcon sx={{ fontSize: 22 }} />
                    <div>Admin</div>
                </Link>

                <div
                    onClick={handleLogout}
                    className={styles.sideBarOption}
                >
                    <LogoutIcon sx={{ fontSize: 22 }} />
                    <div>LogOut</div>
                </div>

            </div>
        </div>
    )
}

export default SideBar