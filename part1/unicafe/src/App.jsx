import { useState } from 'react'

const Button = ({option, onClick}) => <button onClick={onClick}>{option}</button>

const Feedback = ({feedbackStates}) => {
  return (
    <section>
      <h2>give feedback</h2>
      <div>
        {feedbackStates.map(opt => (
          <Button
            key={opt.option}
            option={opt.option}
            onClick={() => opt.updater(opt.val + 1)} />
        ))}
      </div>
    </section>
  )
}

const StatisticLine = ({statname, value}) => (
  <tr>
    <td>{statname}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const avg = (1 * good / total) + (-1 * bad / total)
  const posRatio = `${100 * good / total}%`

  // note: <tbody> solely to deal with react warning,
  //       not actually necessary according to html5 spec
  return (
    <section>
      <h2>statistics</h2>
      {total === 0 && <p>No feedback given</p>}
      {total !== 0 && (
        <table>
          <tbody>
            <StatisticLine statname="good" value={good} />
            <StatisticLine statname="neutral" value={neutral} />
            <StatisticLine statname="bad" value={bad} />
            <StatisticLine statname="all" value={total} />
            <StatisticLine statname="average" value={avg} />
            <StatisticLine statname="positive" value={posRatio} />
          </tbody>
        </table>
      )}
    </section>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Unicafe Feedback</h1>
      <Feedback
        feedbackStates={[
          {val: good, updater: setGood, option:"good"},
          {val: neutral, updater: setNeutral, option:"neutral"},
          {val: bad, updater: setBad, option:"bad"}]}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
