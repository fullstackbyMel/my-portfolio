import './TagList.css'

function TagList({ items }) {
  return (
    <ul className="tag-list">
      {items.map((item) => (
        <li key={item} className="tag-list__item">
          {item}
        </li>
      ))}
    </ul>
  )
}

export default TagList