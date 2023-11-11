
const SearchField = ({ value, onChange }) => {
  const style = {
    border: 'solid 1px',
    padding: '0 16px 16px 16px',
    margin: '16px 0'
  }
  const searchInterfaceStyle = {
    display: 'flex',
    gap: '8px'
  }

  return (
    <section style={ style }>
      <h2>Search</h2>
      <div style={ searchInterfaceStyle }>
        Find countries
        <input
          value={ value }
          onChange={ onChange } />
      </div>
    </section>
  )
}

export default SearchField