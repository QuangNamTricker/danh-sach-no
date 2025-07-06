import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'https://debt-api.tuquangnamht2007.workers.dev'

function App() {
  const [debts, setDebts] = useState([])
  const [form, setForm] = useState({
    person: '',
    amount: '',
    description: '',
    is_owed: true
  })

  useEffect(() => {
    fetchDebts()
  }, [])

  const fetchDebts = async () => {
    const res = await axios.get(`${API_URL}/api/debts`)
    setDebts(res.data)
  }

  const addDebt = async (e) => {
    e.preventDefault()
    await axios.post(`${API_URL}/api/debts`, {
      ...form,
      amount: parseFloat(form.amount)
    })
    setForm({
      person: '',
      amount: '',
      description: '',
      is_owed: true
    })
    fetchDebts()
  }

  const deleteDebt = async (id) => {
    await axios.delete(`${API_URL}/api/debts/${id}`)
    fetchDebts()
  }

  return (
    <div className="container">
      <h1>Quản lý nợ</h1>
      
      <form onSubmit={addDebt}>
        <input
          value={form.person}
          onChange={(e) => setForm({...form, person: e.target.value})}
          placeholder="Tên người"
          required
        />
        <input
          type="number"
          value={form.amount}
          onChange={(e) => setForm({...form, amount: e.target.value})}
          placeholder="Số tiền"
          required
        />
        <input
          value={form.description}
          onChange={(e) => setForm({...form, description: e.target.value})}
          placeholder="Mô tả"
        />
        <label>
          <input
            type="checkbox"
            checked={form.is_owed}
            onChange={(e) => setForm({...form, is_owed: e.target.checked})}
          />
          Họ nợ mình
        </label>
        <button type="submit">Thêm</button>
      </form>
      
      <div className="debts-list">
        {debts.map(debt => (
          <div key={debt.id} className={`debt ${debt.is_owed ? 'owed' : 'owing'}`}>
            <h3>{debt.person}</h3>
            <p>{debt.amount} VND</p>
            <p>{debt.description}</p>
            <small>{new Date(debt.created_at).toLocaleString()}</small>
            <button onClick={() => deleteDebt(debt.id)}>Xóa</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App