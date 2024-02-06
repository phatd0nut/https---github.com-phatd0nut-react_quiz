import React from 'react'
import './Home.css'

const Home = () => {
    return (
        <>
            <div className='content'>
                <div className='settings'>
                    <span style={{ fontSize: 30 }}>Setup your quiz</span>
                </div>


                <img src='/quiz.png' className='banner' alt='Quiz bulb' style={{ width: 200 }}></img>
            </div>
        </>
    )
}

export default Home