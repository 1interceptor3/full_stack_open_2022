import { useState } from 'react'

const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const StatisticsLine = ({text, value, postText=""}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}{postText}</td>
        </tr>
    )
}

const StatisticsTable = ({good, neutral, bad}) => {
    return (
        <table>
            <thead></thead>
            <tbody>
                <StatisticsLine text="good" value={good}/>
                <StatisticsLine text="neutral" value={neutral}/>
                <StatisticsLine text="bad" value={bad}/>
                <StatisticsLine text="all" value={good + neutral + bad}/>
                <StatisticsLine text="average" value={(good - bad) / (good + neutral + bad)} />
                <StatisticsLine text="positive" value={good / (good + neutral + bad) * 100} postText=" %"/>
            </tbody>
        </table>
    )
}

const Statistics = ({good, neutral, bad}) => {
    if (good || neutral || bad) {
        return (
            <div>
                <h2>statistics</h2>
                <StatisticsTable good={good} neutral={neutral} bad={bad} />
            </div>
        )
    } else {
        return <p>No feedback given</p>
    }
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1);
    }
    const handleNeutralClick = () => {
        setNeutral(neutral + 1);
    }
    const handleBadClick = () => {
        setBad(bad + 1);
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={handleGoodClick} text="good" />
            <Button onClick={handleNeutralClick} text="neutral" />
            <Button onClick={handleBadClick} text="bad" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App