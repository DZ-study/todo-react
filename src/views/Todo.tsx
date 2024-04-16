import { useMemo, useState } from 'react'
import './style.less'

export default function Todo() {
  const [addText, setAddText] = useState('')
  const [todoList, setTodoList] = useState<TodoItem[]>([])
  const [list, setList] =useState<TodoItem[]>([])

  const addTodoItem = () => {
    if (addText === '') return
    const id = crypto.randomUUID()
    const todoItem: TodoItem = {
      id,
      text: addText,
      completed: false
    }

    const list = [...todoList, todoItem]
    setList(list)
    setTodoList(list)
    setAddText('')
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => { // Enter键添加待办事项
    if (event?.key !== 'Enter') return
    addTodoItem()
  }

  const handleClick = (item: TodoItem, index:number) => {
    item.completed = !item.completed
    const list = [...todoList]
    list[index] = item
    setTodoList(list)
  }

  const handleChangeList = (type: string) => {
    switch (type) {
      case 'all':
        setTodoList([...list])
        break
      case 'active':
        setTodoList(list.filter(o => !o.completed))
        break
      case 'completed':
        setTodoList(list.filter(o => o.completed))
        break
    }
  }

  const handleClear = () => { // 清除已完成项
    const activeList = list.filter(o => !o.completed)
    setList(activeList)
    setTodoList(activeList)
  }

  const leftCount = useMemo(() => {
    return todoList.filter(o => !o.completed).length
  }, [todoList])

  return <div className='todo-container'>
    <input
      className='add-item'
      value={addText}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddText(e.target.value)}
      onKeyDown={handleEnter}
      placeholder='Create a new todo...' />
    <div className="todo-list">
      { todoList.map((item:TodoItem, index: number) => (
        <div className={`todo-item ${item.completed ? 'is-active' : ''}`} key={item.id} onClick={() => handleClick(item, index)}>
          <div className='item-radio'></div>
          <div className='item-content'>{ item.text }</div>
        </div>))}
    </div>
    <div className='footer'>
      <div>
        { leftCount } items left
      </div>
      <div className='filter-options'>
        <span onClick={() => handleChangeList('all')}>All</span>
        <span onClick={() => handleChangeList('active')}>Active</span>
        <span onClick={() => handleChangeList('completed')}>Completed</span>
      </div>
      <div className='clear-btn' onClick={handleClear}>Clear Completed</div>
    </div>
  </div>
}