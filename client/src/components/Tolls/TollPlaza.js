import ListSearchedToll from "./ListSearchedToll"
const TollPlaza = (props) => {
  return (
    <div>
      <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Location</th>
        <th>nhNo</th>
        <th>State</th>
        <th>Section</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <ListSearchedToll tollPlaza = {props.tollPlaza}/>
    </table>
    </div>
  )
}

export default TollPlaza