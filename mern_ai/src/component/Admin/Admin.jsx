import React, { useState, useEffect } from 'react'
import styles from './Admin.module.css'
import { Skeleton } from '@mui/material'
import WithAuthHOC from '../../utils/HOC/withAuthHOC'
import axios from '../../utils/axios'

const Admin = () => {

    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {

        const fetchAllData = async () => {

            setLoader(true)

            try {

                /*
                 * Backend available hone par:
                 *
                 * const response = await axios.get('/resume/all')
                 * setData(response.data)
                 */

                // Temporary Resume MERN Score admin data
                await new Promise(resolve => setTimeout(resolve, 1000))

                const demoData = [
                    {
                        _id: '1',
                        name: 'Rahul Kumar',
                        email: 'rahul@example.com',
                        resume_name: 'Frontend Developer Resume',
                        role: 'Frontend Developer',
                        score: 92,
                        status: 'Excellent',
                        createdAt: '2026-08-13'
                    },
                    {
                        _id: '2',
                        name: 'Priya Sharma',
                        email: 'priya@example.com',
                        resume_name: 'Full Stack Developer Resume',
                        role: 'Full Stack Developer',
                        score: 88,
                        status: 'Good',
                        createdAt: '2026-08-12'
                    },
                    {
                        _id: '3',
                        name: 'Amit Singh',
                        email: 'amit@example.com',
                        resume_name: 'Data Analyst Resume',
                        role: 'Data Analyst',
                        score: 84,
                        status: 'Good',
                        createdAt: '2026-08-11'
                    },
                    {
                        _id: '4',
                        name: 'Neha Verma',
                        email: 'neha@example.com',
                        resume_name: 'React Developer Resume',
                        role: 'React Developer',
                        score: 95,
                        status: 'Excellent',
                        createdAt: '2026-08-10'
                    }
                ]

                setData(demoData)

            } catch (error) {

                console.log('Error fetching admin data:', error)
                setData([])

            } finally {

                setLoader(false)

            }
        }

        fetchAllData()

    }, [])

    return (
        <div className={styles.Admin}>

            <div className={styles.AdminBlock}>

                {loader && (
                    <>
                        <Skeleton
                            variant="rectangular"
                            width={266}
                            height={400}
                            sx={{ borderRadius: '20px' }}
                        />

                        <Skeleton
                            variant="rectangular"
                            width={266}
                            height={400}
                            sx={{ borderRadius: '20px' }}
                        />

                        <Skeleton
                            variant="rectangular"
                            width={266}
                            height={400}
                            sx={{ borderRadius: '20px' }}
                        />
                    </>
                )}

                {!loader && data.length === 0 && (
                    <div>
                        <h2>No Resume Data Found</h2>
                        <p>
                            Resume analysis records will appear here.
                        </p>
                    </div>
                )}

                {!loader && data.map((item) => (
                    <div
                        key={item._id}
                        className={styles.AdminCard}
                    >

                        <h2>{item.name}</h2>

                        <p>
                            <strong>Email:</strong> {item.email}
                        </p>

                        <p>
                            <strong>Resume:</strong> {item.resume_name}
                        </p>

                        <p>
                            <strong>Role:</strong> {item.role}
                        </p>

                        <div>
                            <strong>Resume Score:</strong>
                            <h1>{item.score}%</h1>
                        </div>

                        <p>
                            <strong>Status:</strong> {item.status}
                        </p>

                        <p>
                            <strong>Date:</strong> {item.createdAt}
                        </p>

                    </div>
                ))}

            </div>

        </div>
    )
}

export default WithAuthHOC(Admin)