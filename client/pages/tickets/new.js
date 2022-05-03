import { useState } from "react"

const NewTicket = () => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")

  const onPriceInputBlur = () => {
    const value = parseFloat(price)

    if (isNaN(value)) {
      return
    }

    setPrice(value.toFixed(2))
  }

  return (
    <div>
      <h1>Create a new ticket</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title"
            type="text"
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input id="price"
            type="text"
            className="form-control"
            value={price}
            onChange={e => setPrice(e.target.value)}
            onBlur={onPriceInputBlur}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

NewTicket.getInitialProps = async (context, client, currentUser) => {
  return {}
}

export default NewTicket