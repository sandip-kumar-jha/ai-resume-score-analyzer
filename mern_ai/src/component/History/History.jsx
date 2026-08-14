import styles from './History.module.css'
import { Skeleton } from '@mui/material'
import WithAuthHOC from '../../utils/HOC/withAuthHOC'
import { useState, useEffect, useContext } from 'react'
import axios from '../../utils/axios'
import { AuthContext } from '../../utils/AuthContext'

const History = () => {
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)

    const { userInfo } = useContext(AuthContext)

    useEffect(() => {

        const fetchUserData = async () => {
            setLoader(true)

            try {
                // Backend API available ho to yahan se data fetch hoga
                // const response = await axios.get('/resume/history')
                // setData(response.data)

                // Temporary demo data for Resume MERN Score
                const demoData = [
                    {
                        _id: '1',
                        score: 92,
                        resume_name: 'Frontend Developer Resume',
                        role: 'Frontend Developer',
                        feedback: 'Strong React, JavaScript, HTML and CSS skills. Good project experience.',
                        createdAt: '2026-08-13T10:30:00'
                    },
                    {
                        _id: '2',
                        score: 88,
                        resume_name: 'Full Stack Developer Resume',
                        role: 'Full Stack Developer',
                        feedback: 'Good MERN Stack knowledge with Node.js, Express.js and MongoDB.',
                        createdAt: '2026-08-12T09:20:00'
                    },
                    {
                        _id: '3',
                        score: 85,
                        resume_name: 'Data Analyst Resume',
                        role: 'Data Analyst',
                        feedback: 'Strong SQL, Python, Excel and Power BI skills. Add more real-world projects.',
                        createdAt: '2026-08-11T14:10:00'
                    },
                    {
                        _id: '4',
                        score: 90,
                        resume_name: 'React Developer Resume',
                        role: 'React Developer',
                        feedback: 'Excellent React fundamentals and good frontend project portfolio.',
                        createdAt: '2026-08-10T11:45:00'
                    },
                    {
                        _id: '5',
                        score: 82,
                        resume_name: 'Backend Developer Resume',
                        role: 'Backend Developer',
                        feedback: 'Good Node.js and Express knowledge. Improve API security and system design.',
                        createdAt: '2026-08-09T16:25:00'
                    },
                    {
                        _id: '6',
                        score: 87,
                        resume_name: 'Software Developer Resume',
                        role: 'Software Developer',
                        feedback: 'Good programming fundamentals and projects. Add more DSA and problem-solving experience.',
                        createdAt: '2026-08-08T12:15:00'
                    }
                ]

                setData(demoData)

            } catch (error) {
                console.log('Error fetching history:', error)
                setData([])
            } finally {
                setLoader(false)
            }
        }

        fetchUserData()

    }, [userInfo])

    return (
        <div className={styles.History}>

            <div className={styles.HistoryCardBlock}>

                {loader && (
                    <>
                        <Skeleton
                            variant="rectangular"
                            width={266}
                            height={200}
                            sx={{ borderRadius: '20px' }}
                        />

                        <Skeleton
                            variant="rectangular"
                            width={266}
                            height={200}
                            sx={{ borderRadius: '20px' }}
                        />

                        <Skeleton
                            variant="rectangular"
                            width={266}
                            height={200}
                            sx={{ borderRadius: '20px' }}
                        />

                        <Skeleton
                            variant="rectangular"
                            width={266}
                            height={200}
                            sx={{ borderRadius: '20px' }}
                        />
                    </>
                )}

                {!loader && data.length === 0 && (
                    <div>
                        <h2>No Resume History Found</h2>
                        <p>Upload and analyze your resume to see your score here.</p>
                    </div>
                )}

                {!loader && data.map((item) => (
                    <div
                        key={item._id}
                        className={styles.HistoryCard}
                    >

                        <div className={styles.cardPercentage}>
                            {item.score}%
                        </div>

                        <h2>{item.role}</h2>

                        <p>
                            <strong>Resume Name:</strong> {item.resume_name}
                        </p>

                        <p>
                            <strong>Feedback:</strong> {item.feedback}
                        </p>

                        <p>
                            <strong>Date:</strong>{' '}
                            {item.createdAt
                                ? item.createdAt.slice(0, 10)
                                : 'N/A'}
                        </p>

                    </div>
                ))}

            </div>

        </div>
    )
}

export default WithAuthHOC(History)